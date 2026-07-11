export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          id: string
          level: Database["public"]["Enums"]["log_level"]
          meta: Json
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          id?: string
          level?: Database["public"]["Enums"]["log_level"]
          meta?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          id?: string
          level?: Database["public"]["Enums"]["log_level"]
          meta?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      deliveries: {
        Row: {
          assigned_at: string | null
          cancelled_at: string | null
          commission_cents: number
          completed_at: string | null
          created_at: string
          currency: string
          delivered_at: string | null
          distance_km: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          duration_min: number
          id: string
          package_notes: string | null
          package_type: string | null
          payment_provider:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_status: Database["public"]["Enums"]["payment_status"]
          picked_up_at: string | null
          pickup_address: string
          pickup_contact_name: string | null
          pickup_contact_phone: string | null
          pickup_lat: number
          pickup_lng: number
          price_cents: number
          recipient_name: string
          recipient_phone: string
          rider_id: string | null
          status: Database["public"]["Enums"]["delivery_status"]
          tracking_id: string
          updated_at: string
          user_id: string
          vehicle_type_id: string | null
          verification_attempts: number
          verification_code_hash: string
          verification_locked_until: string | null
        }
        Insert: {
          assigned_at?: string | null
          cancelled_at?: string | null
          commission_cents?: number
          completed_at?: string | null
          created_at?: string
          currency?: string
          delivered_at?: string | null
          distance_km: number
          dropoff_address: string
          dropoff_lat: number
          dropoff_lng: number
          duration_min: number
          id?: string
          package_notes?: string | null
          package_type?: string | null
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          picked_up_at?: string | null
          pickup_address: string
          pickup_contact_name?: string | null
          pickup_contact_phone?: string | null
          pickup_lat: number
          pickup_lng: number
          price_cents: number
          recipient_name: string
          recipient_phone: string
          rider_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          tracking_id?: string
          updated_at?: string
          user_id: string
          vehicle_type_id?: string | null
          verification_attempts?: number
          verification_code_hash: string
          verification_locked_until?: string | null
        }
        Update: {
          assigned_at?: string | null
          cancelled_at?: string | null
          commission_cents?: number
          completed_at?: string | null
          created_at?: string
          currency?: string
          delivered_at?: string | null
          distance_km?: number
          dropoff_address?: string
          dropoff_lat?: number
          dropoff_lng?: number
          duration_min?: number
          id?: string
          package_notes?: string | null
          package_type?: string | null
          payment_provider?:
            | Database["public"]["Enums"]["payment_provider"]
            | null
          payment_status?: Database["public"]["Enums"]["payment_status"]
          picked_up_at?: string | null
          pickup_address?: string
          pickup_contact_name?: string | null
          pickup_contact_phone?: string | null
          pickup_lat?: number
          pickup_lng?: number
          price_cents?: number
          recipient_name?: string
          recipient_phone?: string
          rider_id?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
          tracking_id?: string
          updated_at?: string
          user_id?: string
          vehicle_type_id?: string | null
          verification_attempts?: number
          verification_code_hash?: string
          verification_locked_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deliveries_vehicle_type_id_fkey"
            columns: ["vehicle_type_id"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          },
        ]
      }
      delivery_status_history: {
        Row: {
          actor_id: string | null
          created_at: string
          delivery_id: string
          id: string
          lat: number | null
          lng: number | null
          note: string | null
          status: Database["public"]["Enums"]["delivery_status"]
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          delivery_id: string
          id?: string
          lat?: number | null
          lng?: number | null
          note?: string | null
          status: Database["public"]["Enums"]["delivery_status"]
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          delivery_id?: string
          id?: string
          lat?: number | null
          lng?: number | null
          note?: string | null
          status?: Database["public"]["Enums"]["delivery_status"]
        }
        Relationships: [
          {
            foreignKeyName: "delivery_status_history_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          delivery_id: string | null
          id: string
          read: boolean
          title: string
          type: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          delivery_id?: string | null
          id?: string
          read?: boolean
          title: string
          type?: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          delivery_id?: string | null
          id?: string
          read?: boolean
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          delivery_id: string | null
          id: string
          provider: Database["public"]["Enums"]["payment_provider"]
          raw: Json
          reference: string
          status: Database["public"]["Enums"]["payment_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          delivery_id?: string | null
          id?: string
          provider: Database["public"]["Enums"]["payment_provider"]
          raw?: Json
          reference: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          delivery_id?: string | null
          id?: string
          provider?: Database["public"]["Enums"]["payment_provider"]
          raw?: Json
          reference?: string
          status?: Database["public"]["Enums"]["payment_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      pricing: {
        Row: {
          active: boolean
          base_fare_cents: number
          commission_percent: number
          created_at: string
          currency: string
          id: string
          min_fare_cents: number
          per_km_cents: number
          per_minute_cents: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          base_fare_cents?: number
          commission_percent?: number
          created_at?: string
          currency?: string
          id?: string
          min_fare_cents?: number
          per_km_cents?: number
          per_minute_cents?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          base_fare_cents?: number
          commission_percent?: number
          created_at?: string
          currency?: string
          id?: string
          min_fare_cents?: number
          per_km_cents?: number
          per_minute_cents?: number
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      ratings: {
        Row: {
          comment: string | null
          created_at: string
          delivery_id: string
          id: string
          rating: number
          rider_id: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          delivery_id: string
          id?: string
          rating: number
          rider_id: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          delivery_id?: string
          id?: string
          rating?: number
          rider_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: true
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      rider_assignments: {
        Row: {
          delivery_id: string
          expires_at: string
          id: string
          offered_at: string
          responded_at: string | null
          rider_id: string
          status: Database["public"]["Enums"]["assignment_status"]
        }
        Insert: {
          delivery_id: string
          expires_at?: string
          id?: string
          offered_at?: string
          responded_at?: string | null
          rider_id: string
          status?: Database["public"]["Enums"]["assignment_status"]
        }
        Update: {
          delivery_id?: string
          expires_at?: string
          id?: string
          offered_at?: string
          responded_at?: string | null
          rider_id?: string
          status?: Database["public"]["Enums"]["assignment_status"]
        }
        Relationships: [
          {
            foreignKeyName: "rider_assignments_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      riders: {
        Row: {
          created_at: string
          current_lat: number | null
          current_lng: number | null
          documents: Json
          id: string
          is_online: boolean
          license_number: string | null
          rating: number
          rider_code: string
          status: Database["public"]["Enums"]["rider_status"]
          total_deliveries: number
          updated_at: string
          vehicle_plate: string | null
          vehicle_type_id: string | null
        }
        Insert: {
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          documents?: Json
          id: string
          is_online?: boolean
          license_number?: string | null
          rating?: number
          rider_code: string
          status?: Database["public"]["Enums"]["rider_status"]
          total_deliveries?: number
          updated_at?: string
          vehicle_plate?: string | null
          vehicle_type_id?: string | null
        }
        Update: {
          created_at?: string
          current_lat?: number | null
          current_lng?: number | null
          documents?: Json
          id?: string
          is_online?: boolean
          license_number?: string | null
          rating?: number
          rider_code?: string
          status?: Database["public"]["Enums"]["rider_status"]
          total_deliveries?: number
          updated_at?: string
          vehicle_plate?: string | null
          vehicle_type_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "riders_vehicle_type_id_fkey"
            columns: ["vehicle_type_id"]
            isOneToOne: false
            referencedRelation: "vehicle_types"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          key: string
          updated_at: string
          value: Json
        }
        Insert: {
          key: string
          updated_at?: string
          value: Json
        }
        Update: {
          key?: string
          updated_at?: string
          value?: Json
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_admin: string | null
          created_at: string
          delivery_id: string | null
          id: string
          priority: string
          status: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_admin?: string | null
          created_at?: string
          delivery_id?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_admin?: string | null
          created_at?: string
          delivery_id?: string | null
          id?: string
          priority?: string
          status?: Database["public"]["Enums"]["ticket_status"]
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      ticket_messages: {
        Row: {
          body: string
          created_at: string
          id: string
          sender_id: string
          ticket_id: string
        }
        Insert: {
          body: string
          created_at?: string
          id?: string
          sender_id: string
          ticket_id: string
        }
        Update: {
          body?: string
          created_at?: string
          id?: string
          sender_id?: string
          ticket_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ticket_messages_ticket_id_fkey"
            columns: ["ticket_id"]
            isOneToOne: false
            referencedRelation: "support_tickets"
            referencedColumns: ["id"]
          },
        ]
      }
      tracking_locations: {
        Row: {
          accuracy: number | null
          created_at: string
          delivery_id: string
          heading: number | null
          id: string
          lat: number
          lng: number
          rider_id: string
          speed: number | null
        }
        Insert: {
          accuracy?: number | null
          created_at?: string
          delivery_id: string
          heading?: number | null
          id?: string
          lat: number
          lng: number
          rider_id: string
          speed?: number | null
        }
        Update: {
          accuracy?: number | null
          created_at?: string
          delivery_id?: string
          heading?: number | null
          id?: string
          lat?: number
          lng?: number
          rider_id?: string
          speed?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tracking_locations_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount_cents: number
          created_at: string
          currency: string
          delivery_id: string | null
          id: string
          meta: Json
          provider: Database["public"]["Enums"]["payment_provider"] | null
          reference: string | null
          status: Database["public"]["Enums"]["payment_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id: string | null
        }
        Insert: {
          amount_cents: number
          created_at?: string
          currency?: string
          delivery_id?: string | null
          id?: string
          meta?: Json
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          type: Database["public"]["Enums"]["transaction_type"]
          user_id: string
          wallet_id?: string | null
        }
        Update: {
          amount_cents?: number
          created_at?: string
          currency?: string
          delivery_id?: string | null
          id?: string
          meta?: Json
          provider?: Database["public"]["Enums"]["payment_provider"] | null
          reference?: string | null
          status?: Database["public"]["Enums"]["payment_status"]
          type?: Database["public"]["Enums"]["transaction_type"]
          user_id?: string
          wallet_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "transactions_delivery_id_fkey"
            columns: ["delivery_id"]
            isOneToOne: false
            referencedRelation: "deliveries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicle_types: {
        Row: {
          active: boolean
          capacity_kg: number | null
          code: string
          created_at: string
          description: string | null
          id: string
          name: string
          price_multiplier: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          active?: boolean
          capacity_kg?: number | null
          code: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          price_multiplier?: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          active?: boolean
          capacity_kg?: number | null
          code?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          price_multiplier?: number
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          balance_cents: number
          currency: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          balance_cents?: number
          currency?: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          balance_cents?: number
          currency?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_tracking_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      hash_verification_code: { Args: { _code: string }; Returns: string }
    }
    Enums: {
      app_role: "user" | "rider" | "admin"
      assignment_status:
        | "offered"
        | "accepted"
        | "rejected"
        | "expired"
        | "cancelled"
      delivery_status:
        | "waiting_for_rider"
        | "assigned"
        | "heading_to_pickup"
        | "arrived_at_pickup"
        | "package_collected"
        | "heading_to_destination"
        | "arrived_at_destination"
        | "waiting_for_verification"
        | "delivered"
        | "completed"
        | "cancelled"
        | "failed"
      log_level: "info" | "warn" | "error"
      payment_provider: "paystack" | "flutterwave" | "wallet" | "cash"
      payment_status: "pending" | "paid" | "failed" | "refunded"
      rider_status: "pending" | "active" | "suspended" | "rejected"
      ticket_status: "open" | "pending" | "resolved" | "closed"
      transaction_type: "topup" | "payment" | "payout" | "refund" | "commission"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "rider", "admin"],
      assignment_status: [
        "offered",
        "accepted",
        "rejected",
        "expired",
        "cancelled",
      ],
      delivery_status: [
        "waiting_for_rider",
        "assigned",
        "heading_to_pickup",
        "arrived_at_pickup",
        "package_collected",
        "heading_to_destination",
        "arrived_at_destination",
        "waiting_for_verification",
        "delivered",
        "completed",
        "cancelled",
        "failed",
      ],
      log_level: ["info", "warn", "error"],
      payment_provider: ["paystack", "flutterwave", "wallet", "cash"],
      payment_status: ["pending", "paid", "failed", "refunded"],
      rider_status: ["pending", "active", "suspended", "rejected"],
      ticket_status: ["open", "pending", "resolved", "closed"],
      transaction_type: ["topup", "payment", "payout", "refund", "commission"],
    },
  },
} as const
