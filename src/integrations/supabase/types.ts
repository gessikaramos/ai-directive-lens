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
      collective_applications: {
        Row: {
          created_at: string | null
          expertise: string[]
          favorite_project: string
          id: string
          ip_hash: string | null
          linkedin_url: string | null
          location: string
          name: string
          notes: string | null
          portfolio_url: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          website_url: string | null
          why_lolalab: string
        }
        Insert: {
          created_at?: string | null
          expertise: string[]
          favorite_project: string
          id?: string
          ip_hash?: string | null
          linkedin_url?: string | null
          location: string
          name: string
          notes?: string | null
          portfolio_url: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          website_url?: string | null
          why_lolalab: string
        }
        Update: {
          created_at?: string | null
          expertise?: string[]
          favorite_project?: string
          id?: string
          ip_hash?: string | null
          linkedin_url?: string | null
          location?: string
          name?: string
          notes?: string | null
          portfolio_url?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          website_url?: string | null
          why_lolalab?: string
        }
        Relationships: []
      }
      hit_conversations: {
        Row: {
          ai_response: string | null
          created_at: string | null
          filter_applied: boolean | null
          id: string
          ip_hash: string | null
          latency_ms: number | null
          message_index: number | null
          model_used: string | null
          session_id: string
          user_message: string | null
        }
        Insert: {
          ai_response?: string | null
          created_at?: string | null
          filter_applied?: boolean | null
          id?: string
          ip_hash?: string | null
          latency_ms?: number | null
          message_index?: number | null
          model_used?: string | null
          session_id: string
          user_message?: string | null
        }
        Update: {
          ai_response?: string | null
          created_at?: string | null
          filter_applied?: boolean | null
          id?: string
          ip_hash?: string | null
          latency_ms?: number | null
          message_index?: number | null
          model_used?: string | null
          session_id?: string
          user_message?: string | null
        }
        Relationships: []
      }
      hit_feedback: {
        Row: {
          comment: string | null
          created_at: string | null
          feedback_type: string | null
          id: string
          message_id: string | null
          session_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          message_id?: string | null
          session_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string | null
          feedback_type?: string | null
          id?: string
          message_id?: string | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hit_feedback_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "hit_conversations"
            referencedColumns: ["id"]
          },
        ]
      }
      signal_opt_in: {
        Row: {
          confirmation_token: string | null
          confirmed: boolean | null
          confirmed_at: string | null
          created_at: string | null
          email: string
          id: string
          ip_hash: string | null
          source: string | null
        }
        Insert: {
          confirmation_token?: string | null
          confirmed?: boolean | null
          confirmed_at?: string | null
          created_at?: string | null
          email: string
          id?: string
          ip_hash?: string | null
          source?: string | null
        }
        Update: {
          confirmation_token?: string | null
          confirmed?: boolean | null
          confirmed_at?: string | null
          created_at?: string | null
          email?: string
          id?: string
          ip_hash?: string | null
          source?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
