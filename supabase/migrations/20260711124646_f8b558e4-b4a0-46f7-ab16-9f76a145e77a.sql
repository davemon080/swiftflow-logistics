
CREATE OR REPLACE FUNCTION public.hash_verification_code(_code TEXT)
RETURNS TEXT LANGUAGE SQL IMMUTABLE SET search_path = public, extensions
AS $$ SELECT encode(extensions.digest(_code, 'sha256'), 'hex') $$;

CREATE OR REPLACE FUNCTION public.generate_tracking_id()
RETURNS TEXT LANGUAGE plpgsql SET search_path = public, extensions AS $$
BEGIN
  RETURN 'SW-' || upper(substr(md5(gen_random_uuid()::text),1,8));
END; $$;

REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;

REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_delivery_status_change() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;

DROP POLICY IF EXISTS "logs_insert_auth" ON public.activity_logs;
CREATE POLICY "logs_insert_self" ON public.activity_logs FOR INSERT TO authenticated
  WITH CHECK (actor_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
