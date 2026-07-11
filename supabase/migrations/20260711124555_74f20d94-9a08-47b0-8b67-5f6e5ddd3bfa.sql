
-- Extensions
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============ ENUMS ============
CREATE TYPE public.app_role AS ENUM ('user', 'rider', 'admin');
CREATE TYPE public.rider_status AS ENUM ('pending', 'active', 'suspended', 'rejected');
CREATE TYPE public.delivery_status AS ENUM (
  'waiting_for_rider','assigned','heading_to_pickup','arrived_at_pickup',
  'package_collected','heading_to_destination','arrived_at_destination',
  'waiting_for_verification','delivered','completed','cancelled','failed'
);
CREATE TYPE public.assignment_status AS ENUM ('offered','accepted','rejected','expired','cancelled');
CREATE TYPE public.payment_status AS ENUM ('pending','paid','failed','refunded');
CREATE TYPE public.payment_provider AS ENUM ('paystack','flutterwave','wallet','cash');
CREATE TYPE public.transaction_type AS ENUM ('topup','payment','payout','refund','commission');
CREATE TYPE public.ticket_status AS ENUM ('open','pending','resolved','closed');
CREATE TYPE public.log_level AS ENUM ('info','warn','error');

-- ============ UTILITY FN ============
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

-- ============ PROFILES ============
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ USER ROLES ============
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$ SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role) $$;

CREATE POLICY "profiles_self_read" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles_self_update" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_self_insert" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "user_roles_read_self_or_admin" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ HANDLE NEW USER ============
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  _role public.app_role;
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone'
  ) ON CONFLICT (id) DO NOTHING;

  _role := COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'user');
  -- Only allow 'user' or 'rider' via signup metadata; admin must be granted manually.
  IF _role NOT IN ('user','rider') THEN _role := 'user'; END IF;

  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, _role)
    ON CONFLICT DO NOTHING;

  -- Create wallet for users
  INSERT INTO public.wallets (user_id) VALUES (NEW.id) ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

-- ============ WALLETS ============
CREATE TABLE public.wallets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  balance_cents BIGINT NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.wallets TO authenticated;
GRANT ALL ON public.wallets TO service_role;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "wallets_owner_read" ON public.wallets FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_wallets_updated BEFORE UPDATE ON public.wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Attach signup trigger AFTER wallets exists
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ VEHICLE TYPES ============
CREATE TABLE public.vehicle_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  capacity_kg NUMERIC(10,2),
  price_multiplier NUMERIC(4,2) NOT NULL DEFAULT 1.0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.vehicle_types TO authenticated, anon;
GRANT ALL ON public.vehicle_types TO service_role;
ALTER TABLE public.vehicle_types ENABLE ROW LEVEL SECURITY;
CREATE POLICY "vehicle_types_public_read" ON public.vehicle_types FOR SELECT USING (TRUE);
CREATE POLICY "vehicle_types_admin_write" ON public.vehicle_types FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_vt_updated BEFORE UPDATE ON public.vehicle_types
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ PRICING ============
CREATE TABLE public.pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  base_fare_cents BIGINT NOT NULL DEFAULT 50000,
  per_km_cents BIGINT NOT NULL DEFAULT 15000,
  per_minute_cents BIGINT NOT NULL DEFAULT 2000,
  min_fare_cents BIGINT NOT NULL DEFAULT 80000,
  commission_percent NUMERIC(5,2) NOT NULL DEFAULT 20.0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.pricing TO authenticated;
GRANT ALL ON public.pricing TO service_role;
ALTER TABLE public.pricing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "pricing_auth_read" ON public.pricing FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "pricing_admin_write" ON public.pricing FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_pricing_updated BEFORE UPDATE ON public.pricing
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ RIDERS ============
CREATE TABLE public.riders (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  rider_code TEXT NOT NULL UNIQUE,
  vehicle_type_id UUID REFERENCES public.vehicle_types(id),
  license_number TEXT,
  vehicle_plate TEXT,
  status public.rider_status NOT NULL DEFAULT 'pending',
  is_online BOOLEAN NOT NULL DEFAULT FALSE,
  current_lat NUMERIC(10,7),
  current_lng NUMERIC(10,7),
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
  total_deliveries INT NOT NULL DEFAULT 0,
  documents JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.riders TO authenticated;
GRANT ALL ON public.riders TO service_role;
ALTER TABLE public.riders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "riders_self_read" ON public.riders FOR SELECT TO authenticated
  USING (auth.uid() = id OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "riders_self_update" ON public.riders FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "riders_admin_all" ON public.riders FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE INDEX idx_riders_online ON public.riders (is_online, status) WHERE is_online = TRUE;
CREATE TRIGGER trg_riders_updated BEFORE UPDATE ON public.riders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ TRACKING ID + VERIFICATION CODE GENERATORS ============
CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TEXT LANGUAGE plpgsql AS $$
DECLARE t TEXT;
BEGIN
  t := 'SW-' || upper(substr(md5(gen_random_uuid()::text),1,8));
  RETURN t;
END; $$;

CREATE OR REPLACE FUNCTION public.hash_verification_code(_code TEXT)
RETURNS TEXT LANGUAGE SQL IMMUTABLE AS $$ SELECT encode(digest(_code, 'sha256'), 'hex') $$;

-- ============ DELIVERIES ============
CREATE TABLE public.deliveries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT NOT NULL UNIQUE DEFAULT public.generate_tracking_id(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  rider_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  vehicle_type_id UUID REFERENCES public.vehicle_types(id),
  pickup_address TEXT NOT NULL,
  pickup_lat NUMERIC(10,7) NOT NULL,
  pickup_lng NUMERIC(10,7) NOT NULL,
  pickup_contact_name TEXT,
  pickup_contact_phone TEXT,
  dropoff_address TEXT NOT NULL,
  dropoff_lat NUMERIC(10,7) NOT NULL,
  dropoff_lng NUMERIC(10,7) NOT NULL,
  recipient_name TEXT NOT NULL,
  recipient_phone TEXT NOT NULL,
  package_type TEXT,
  package_notes TEXT,
  distance_km NUMERIC(8,2) NOT NULL,
  duration_min INT NOT NULL,
  price_cents BIGINT NOT NULL,
  commission_cents BIGINT NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status public.delivery_status NOT NULL DEFAULT 'waiting_for_rider',
  verification_code_hash TEXT NOT NULL,
  verification_attempts INT NOT NULL DEFAULT 0,
  verification_locked_until TIMESTAMPTZ,
  payment_status public.payment_status NOT NULL DEFAULT 'pending',
  payment_provider public.payment_provider,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  assigned_at TIMESTAMPTZ,
  picked_up_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  cancelled_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE ON public.deliveries TO authenticated;
GRANT ALL ON public.deliveries TO service_role;
ALTER TABLE public.deliveries ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_deliveries_user ON public.deliveries (user_id, created_at DESC);
CREATE INDEX idx_deliveries_rider ON public.deliveries (rider_id, created_at DESC);
CREATE INDEX idx_deliveries_status ON public.deliveries (status);

CREATE POLICY "deliveries_user_read" ON public.deliveries FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "deliveries_user_insert" ON public.deliveries FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "deliveries_participant_update" ON public.deliveries FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "deliveries_admin_all" ON public.deliveries FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TRIGGER trg_deliveries_updated BEFORE UPDATE ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Also allow anon to SELECT by tracking_id via a public tracking view/policy? Keep restricted; use server fn.

-- ============ DELIVERY STATUS HISTORY ============
CREATE TABLE public.delivery_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES public.deliveries(id) ON DELETE CASCADE,
  status public.delivery_status NOT NULL,
  actor_id UUID REFERENCES auth.users(id),
  note TEXT,
  lat NUMERIC(10,7),
  lng NUMERIC(10,7),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.delivery_status_history TO authenticated;
GRANT ALL ON public.delivery_status_history TO service_role;
ALTER TABLE public.delivery_status_history ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_dsh_delivery ON public.delivery_status_history (delivery_id, created_at);
CREATE POLICY "dsh_read_participant" ON public.delivery_status_history FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.deliveries d WHERE d.id = delivery_id
    AND (d.user_id = auth.uid() OR d.rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "dsh_insert_participant" ON public.delivery_status_history FOR INSERT TO authenticated
  WITH CHECK (EXISTS (SELECT 1 FROM public.deliveries d WHERE d.id = delivery_id
    AND (d.user_id = auth.uid() OR d.rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- Trigger: log status transitions
CREATE OR REPLACE FUNCTION public.log_delivery_status_change()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF TG_OP = 'INSERT' OR (TG_OP='UPDATE' AND NEW.status IS DISTINCT FROM OLD.status) THEN
    INSERT INTO public.delivery_status_history (delivery_id, status, actor_id)
    VALUES (NEW.id, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END; $$;
CREATE TRIGGER trg_delivery_status_log
  AFTER INSERT OR UPDATE OF status ON public.deliveries
  FOR EACH ROW EXECUTE FUNCTION public.log_delivery_status_change();

-- ============ TRACKING LOCATIONS ============
CREATE TABLE public.tracking_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES public.deliveries(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  lat NUMERIC(10,7) NOT NULL,
  lng NUMERIC(10,7) NOT NULL,
  heading NUMERIC(5,2),
  speed NUMERIC(6,2),
  accuracy NUMERIC(6,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.tracking_locations TO authenticated;
GRANT ALL ON public.tracking_locations TO service_role;
ALTER TABLE public.tracking_locations ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_tracking_delivery ON public.tracking_locations (delivery_id, created_at DESC);
CREATE POLICY "tracking_read_participant" ON public.tracking_locations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM public.deliveries d WHERE d.id = delivery_id
    AND (d.user_id = auth.uid() OR d.rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));
CREATE POLICY "tracking_insert_rider" ON public.tracking_locations FOR INSERT TO authenticated
  WITH CHECK (rider_id = auth.uid() AND EXISTS (SELECT 1 FROM public.deliveries d WHERE d.id = delivery_id AND d.rider_id = auth.uid()));

-- ============ RIDER ASSIGNMENTS ============
CREATE TABLE public.rider_assignments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL REFERENCES public.deliveries(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status public.assignment_status NOT NULL DEFAULT 'offered',
  offered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 seconds'),
  responded_at TIMESTAMPTZ,
  UNIQUE (delivery_id, rider_id)
);
GRANT SELECT, UPDATE ON public.rider_assignments TO authenticated;
GRANT ALL ON public.rider_assignments TO service_role;
ALTER TABLE public.rider_assignments ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_assignments_rider ON public.rider_assignments (rider_id, status);
CREATE POLICY "assignments_read_rider" ON public.rider_assignments FOR SELECT TO authenticated
  USING (rider_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "assignments_update_rider" ON public.rider_assignments FOR UPDATE TO authenticated
  USING (rider_id = auth.uid()) WITH CHECK (rider_id = auth.uid());

-- ============ NOTIFICATIONS ============
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  body TEXT,
  type TEXT NOT NULL DEFAULT 'info',
  delivery_id UUID REFERENCES public.deliveries(id) ON DELETE CASCADE,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_notif_user ON public.notifications (user_id, created_at DESC);
CREATE POLICY "notif_owner_all" ON public.notifications FOR ALL TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ TRANSACTIONS ============
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  wallet_id UUID REFERENCES public.wallets(id) ON DELETE SET NULL,
  delivery_id UUID REFERENCES public.deliveries(id) ON DELETE SET NULL,
  type public.transaction_type NOT NULL,
  amount_cents BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status public.payment_status NOT NULL DEFAULT 'pending',
  provider public.payment_provider,
  reference TEXT UNIQUE,
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.transactions TO authenticated;
GRANT ALL ON public.transactions TO service_role;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_tx_user ON public.transactions (user_id, created_at DESC);
CREATE POLICY "tx_owner_read" ON public.transactions FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

-- ============ PAYMENTS ============
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID REFERENCES public.deliveries(id) ON DELETE SET NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider public.payment_provider NOT NULL,
  reference TEXT NOT NULL UNIQUE,
  amount_cents BIGINT NOT NULL,
  currency TEXT NOT NULL DEFAULT 'NGN',
  status public.payment_status NOT NULL DEFAULT 'pending',
  raw JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.payments TO authenticated;
GRANT ALL ON public.payments TO service_role;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "payments_owner_read" ON public.payments FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_payments_updated BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============ SUPPORT TICKETS ============
CREATE TABLE public.support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  delivery_id UUID REFERENCES public.deliveries(id) ON DELETE SET NULL,
  subject TEXT NOT NULL,
  status public.ticket_status NOT NULL DEFAULT 'open',
  priority TEXT NOT NULL DEFAULT 'normal',
  assigned_admin UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "tickets_owner_all" ON public.support_tickets FOR ALL TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE TRIGGER trg_tickets_updated BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.ticket_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID NOT NULL REFERENCES public.support_tickets(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ticket_messages TO authenticated;
GRANT ALL ON public.ticket_messages TO service_role;
ALTER TABLE public.ticket_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ticket_msg_participant" ON public.ticket_messages FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.support_tickets t WHERE t.id = ticket_id
    AND (t.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))))
  WITH CHECK (EXISTS (SELECT 1 FROM public.support_tickets t WHERE t.id = ticket_id
    AND (t.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))));

-- ============ RATINGS ============
CREATE TABLE public.ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  delivery_id UUID NOT NULL UNIQUE REFERENCES public.deliveries(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.ratings TO authenticated;
GRANT ALL ON public.ratings TO service_role;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "ratings_public_read" ON public.ratings FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "ratings_owner_insert" ON public.ratings FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

-- ============ SETTINGS ============
CREATE TABLE public.settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.settings TO authenticated;
GRANT ALL ON public.settings TO service_role;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "settings_auth_read" ON public.settings FOR SELECT TO authenticated USING (TRUE);
CREATE POLICY "settings_admin_write" ON public.settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- ============ ACTIVITY LOGS ============
CREATE TABLE public.activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id TEXT,
  level public.log_level NOT NULL DEFAULT 'info',
  meta JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_logs_created ON public.activity_logs (created_at DESC);
CREATE POLICY "logs_admin_read" ON public.activity_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "logs_insert_auth" ON public.activity_logs FOR INSERT TO authenticated WITH CHECK (TRUE);

-- ============ REALTIME ============
ALTER PUBLICATION supabase_realtime ADD TABLE public.deliveries;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tracking_locations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.rider_assignments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.delivery_status_history;

-- ============ SEED DATA ============
INSERT INTO public.pricing (base_fare_cents, per_km_cents, per_minute_cents, min_fare_cents, commission_percent, currency, active)
VALUES (50000, 15000, 2000, 80000, 20.0, 'NGN', TRUE);

INSERT INTO public.vehicle_types (code, name, description, capacity_kg, price_multiplier, sort_order) VALUES
  ('bike','Bicycle','Eco-friendly for documents and small parcels',5,0.7,1),
  ('motorcycle','Motorcycle','Fastest option for urban deliveries',20,1.0,2),
  ('car','Car','For medium packages and multiple items',150,1.5,3),
  ('van','Van','For bulky or multiple large items',800,2.5,4),
  ('truck','Truck','For heavy freight and business logistics',3000,4.0,5);

INSERT INTO public.settings (key, value) VALUES
  ('app', '{"signups_enabled": true, "maintenance_mode": false, "rider_onboarding_open": true}'::jsonb),
  ('assignment', '{"offer_timeout_seconds": 30, "max_radius_km": 15, "max_offers": 5}'::jsonb),
  ('verification', '{"max_attempts": 5, "lockout_minutes": 15}'::jsonb);
