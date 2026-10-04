import { supabase } from "@/integrations/supabase/client";
import type { TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import {
  defaultFooterMenu,
  defaultHeaderMenu,
  defaultSiteSettings,
  fallbackPostsFromStatic,
} from "@/lib/cms/fallbackContent";
import type {
  CMSLead,
  CMSMediaAsset,
  CMSMenuItem,
  CMSPage,
  CMSPageSection,
  CMSPageWithSections,
  CMSPost,
  CMSSiteSetting,
  DashboardCounts,
  SiteSettingsMap,
} from "@/lib/cms/types";

const orderedByPosition = <T extends { position: number }>(items: T[]) =>
  [...items].sort((a, b) => a.position - b.position);

export const getMenu = async (menuKey: string): Promise<CMSMenuItem[]> => {
  const { data, error } = await supabase
    .from("menus")
    .select("*")
    .eq("menu_key", menuKey)
    .eq("is_active", true)
    .order("position", { ascending: true });

  if (error || !data?.length) {
    return menuKey === "footer" ? defaultFooterMenu : defaultHeaderMenu;
  }

  return orderedByPosition(data);
};

export const getSiteSettings = async (): Promise<SiteSettingsMap> => {
  const { data, error } = await supabase.from("site_settings").select("*");

  if (error || !data?.length) {
    return defaultSiteSettings;
  }

  return data.reduce<SiteSettingsMap>((acc, row) => {
    acc[row.key] = row.value_json;
    return acc;
  }, { ...defaultSiteSettings });
};

export const saveSiteSetting = async (input: TablesInsert<"site_settings">) =>
  supabase.from("site_settings").upsert(input, { onConflict: "key" });

export const getPublishedPosts = async (): Promise<CMSPost[]> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error || !data?.length) {
    return fallbackPostsFromStatic;
  }

  return data;
};

export const getPostBySlug = async (slug: string): Promise<CMSPost | null> => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return fallbackPostsFromStatic.find((post) => post.slug === slug) ?? null;
  }

  return data;
};

export const getAdminPosts = async (): Promise<CMSPost[]> => {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  return data ?? [];
};

export const savePost = async (input: TablesInsert<"posts"> | TablesUpdate<"posts">) =>
  supabase.from("posts").upsert(input);

export const deletePost = async (id: string) => supabase.from("posts").delete().eq("id", id);

export const getAdminPages = async (): Promise<CMSPage[]> => {
  const { data } = await supabase.from("pages").select("*").order("slug");
  return data ?? [];
};

export const savePage = async (input: TablesInsert<"pages"> | TablesUpdate<"pages">) =>
  supabase.from("pages").upsert(input);

export const getPageWithSectionsBySlug = async (slug: string): Promise<CMSPageWithSections | null> => {
  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (!page) return null;

  const { data: sections } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", page.id)
    .eq("status", "published")
    .order("position", { ascending: true });

  return {
    page,
    sections: sections ?? [],
  };
};

export const getPageSections = async (pageId: string): Promise<CMSPageSection[]> => {
  const { data } = await supabase
    .from("page_sections")
    .select("*")
    .eq("page_id", pageId)
    .order("position", { ascending: true });
  return data ?? [];
};

export const savePageSection = async (
  input: TablesInsert<"page_sections"> | TablesUpdate<"page_sections">,
) => supabase.from("page_sections").upsert(input);

export const deletePageSection = async (id: string) =>
  supabase.from("page_sections").delete().eq("id", id);

export const getAdminMedia = async (): Promise<CMSMediaAsset[]> => {
  const { data } = await supabase
    .from("media_assets")
    .select("*")
    .order("updated_at", { ascending: false });
  return data ?? [];
};

export const saveMediaAsset = async (
  input: TablesInsert<"media_assets"> | TablesUpdate<"media_assets">,
) => supabase.from("media_assets").upsert(input);

export const deleteMediaAsset = async (id: string) =>
  supabase.from("media_assets").delete().eq("id", id);

export const getAdminMenus = async (): Promise<CMSMenuItem[]> => {
  const { data } = await supabase
    .from("menus")
    .select("*")
    .order("menu_key")
    .order("position");

  if (!data?.length) {
    return [...defaultHeaderMenu, ...defaultFooterMenu];
  }

  return data;
};

export const saveMenuItem = async (input: TablesInsert<"menus"> | TablesUpdate<"menus">) =>
  supabase.from("menus").upsert(input);

export const deleteMenuItem = async (id: string) => supabase.from("menus").delete().eq("id", id);

export const getLeads = async (): Promise<CMSLead[]> => {
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
};

export const updateLeadStatus = async (id: string, status: string) =>
  supabase.from("contact_submissions").update({ status }).eq("id", id);

export const getDashboardCounts = async (): Promise<DashboardCounts> => {
  const [postsRes, pagesRes, mediaRes, leadsRes] = await Promise.all([
    supabase.from("posts").select("id", { count: "exact", head: true }),
    supabase.from("pages").select("id", { count: "exact", head: true }),
    supabase.from("media_assets").select("id", { count: "exact", head: true }),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
  ]);

  return {
    posts: postsRes.count ?? 0,
    pages: pagesRes.count ?? 0,
    media: mediaRes.count ?? 0,
    leads: leadsRes.count ?? 0,
  };
};

export const listSiteSettingsRows = async (): Promise<CMSSiteSetting[]> => {
  const { data } = await supabase.from("site_settings").select("*").order("key");
  return data ?? [];
};
