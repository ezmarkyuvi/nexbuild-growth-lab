import type { Json, Tables } from "@/integrations/supabase/types";

export type CMSStatus = "draft" | "published";
export type CMSLayoutMode = "default" | "cms";
export type AdminRole = "super_admin" | "editor";

export type CMSPost = Tables<"posts">;
export type CMSPage = Tables<"pages">;
export type CMSPageSection = Tables<"page_sections">;
export type CMSMenuItem = Tables<"menus">;
export type CMSSiteSetting = Tables<"site_settings">;
export type CMSMediaAsset = Tables<"media_assets">;
export type CMSLead = Tables<"contact_submissions">;

export type CMSPageWithSections = {
  page: CMSPage;
  sections: CMSPageSection[];
};

export type DashboardCounts = {
  posts: number;
  pages: number;
  media: number;
  leads: number;
};

export type SiteSettingsMap = Record<string, Json>;
