export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.4";
  };
  public: {
    Tables: {
      admin_users: {
        Row: {
          id: string;
          role: "super_admin" | "editor";
          created_at: string;
        };
        Insert: {
          id: string;
          role?: "super_admin" | "editor";
          created_at?: string;
        };
        Update: {
          id?: string;
          role?: "super_admin" | "editor";
          created_at?: string;
        };
        Relationships: [];
      };
      contact_submissions: {
        Row: {
          company: string | null;
          created_at: string;
          email: string;
          goals: string | null;
          id: string;
          name: string;
          status: string | null;
          website: string | null;
        };
        Insert: {
          company?: string | null;
          created_at?: string;
          email: string;
          goals?: string | null;
          id?: string;
          name: string;
          status?: string | null;
          website?: string | null;
        };
        Update: {
          company?: string | null;
          created_at?: string;
          email?: string;
          goals?: string | null;
          id?: string;
          name?: string;
          status?: string | null;
          website?: string | null;
        };
        Relationships: [];
      };
      media_assets: {
        Row: {
          alt_text: string | null;
          created_at: string;
          id: string;
          metadata: Json | null;
          mime_type: string | null;
          name: string;
          size_bytes: number | null;
          updated_at: string;
          uploaded_by: string | null;
          url: string;
        };
        Insert: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          mime_type?: string | null;
          name: string;
          size_bytes?: number | null;
          updated_at?: string;
          uploaded_by?: string | null;
          url: string;
        };
        Update: {
          alt_text?: string | null;
          created_at?: string;
          id?: string;
          metadata?: Json | null;
          mime_type?: string | null;
          name?: string;
          size_bytes?: number | null;
          updated_at?: string;
          uploaded_by?: string | null;
          url?: string;
        };
        Relationships: [];
      };
      menus: {
        Row: {
          created_at: string;
          id: string;
          is_active: boolean;
          is_cta: boolean;
          is_external: boolean;
          label: string;
          menu_key: string;
          path: string;
          position: number;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          is_cta?: boolean;
          is_external?: boolean;
          label: string;
          menu_key: string;
          path: string;
          position?: number;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_active?: boolean;
          is_cta?: boolean;
          is_external?: boolean;
          label?: string;
          menu_key?: string;
          path?: string;
          position?: number;
          updated_at?: string;
        };
        Relationships: [];
      };
      page_sections: {
        Row: {
          content_json: Json;
          created_at: string;
          id: string;
          page_id: string;
          position: number;
          section_key: string;
          status: "draft" | "published";
          title: string;
          updated_at: string;
        };
        Insert: {
          content_json?: Json;
          created_at?: string;
          id?: string;
          page_id: string;
          position?: number;
          section_key: string;
          status?: "draft" | "published";
          title: string;
          updated_at?: string;
        };
        Update: {
          content_json?: Json;
          created_at?: string;
          id?: string;
          page_id?: string;
          position?: number;
          section_key?: string;
          status?: "draft" | "published";
          title?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      pages: {
        Row: {
          created_at: string;
          id: string;
          layout_mode: "default" | "cms";
          meta_description: string | null;
          meta_title: string | null;
          slug: string;
          status: "draft" | "published";
          title: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          layout_mode?: "default" | "cms";
          meta_description?: string | null;
          meta_title?: string | null;
          slug: string;
          status?: "draft" | "published";
          title: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          layout_mode?: "default" | "cms";
          meta_description?: string | null;
          meta_title?: string | null;
          slug?: string;
          status?: "draft" | "published";
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          category: string;
          content_json: Json;
          created_at: string;
          excerpt: string;
          id: string;
          published_at: string | null;
          seo_description: string | null;
          seo_title: string | null;
          slug: string;
          status: "draft" | "published";
          title: string;
          updated_at: string;
          updated_by: string | null;
        };
        Insert: {
          category: string;
          content_json?: Json;
          created_at?: string;
          excerpt?: string;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug: string;
          status?: "draft" | "published";
          title: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Update: {
          category?: string;
          content_json?: Json;
          created_at?: string;
          excerpt?: string;
          id?: string;
          published_at?: string | null;
          seo_description?: string | null;
          seo_title?: string | null;
          slug?: string;
          status?: "draft" | "published";
          title?: string;
          updated_at?: string;
          updated_by?: string | null;
        };
        Relationships: [];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          updated_by: string | null;
          value_json: Json;
        };
        Insert: {
          key: string;
          updated_at?: string;
          updated_by?: string | null;
          value_json?: Json;
        };
        Update: {
          key?: string;
          updated_at?: string;
          updated_by?: string | null;
          value_json?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
