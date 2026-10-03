import { blogPosts } from "@/data/blogPosts";
import type { CMSMenuItem, CMSPost, SiteSettingsMap } from "@/lib/cms/types";

export const defaultHeaderMenu: CMSMenuItem[] = [
  { id: "h1", menu_key: "header", label: "Home", path: "/", position: 1, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "h2", menu_key: "header", label: "Services", path: "/services", position: 2, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "h3", menu_key: "header", label: "Case Studies", path: "/case-studies", position: 3, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "h4", menu_key: "header", label: "About", path: "/about", position: 4, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "h5", menu_key: "header", label: "Blog", path: "/blog", position: 5, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "h6", menu_key: "header", label: "Contact", path: "/contact", position: 6, is_cta: true, is_external: false, is_active: true, created_at: "", updated_at: "" },
];

export const defaultFooterMenu: CMSMenuItem[] = [
  { id: "f1", menu_key: "footer", label: "Services", path: "/services", position: 1, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "f2", menu_key: "footer", label: "About", path: "/about", position: 2, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "f3", menu_key: "footer", label: "Case Studies", path: "/case-studies", position: 3, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "f4", menu_key: "footer", label: "Blog", path: "/blog", position: 4, is_cta: false, is_external: false, is_active: true, created_at: "", updated_at: "" },
  { id: "f5", menu_key: "footer", label: "Contact", path: "/contact", position: 5, is_cta: true, is_external: false, is_active: true, created_at: "", updated_at: "" },
];

export const defaultSiteSettings: SiteSettingsMap = {
  brand_name: "NexBuildLabs",
  brand_tagline: "Data-driven digital growth for startups and businesses ready to scale.",
  primary_cta_label: "Get Free Audit",
  primary_cta_link: "/contact",
  contact_email: "business@nexbuildlabs.com",
  contact_phone: "+91 75890-78348",
  website_url: "https://nexbuildlabs.com",
};

export const fallbackPostsFromStatic: CMSPost[] = blogPosts.map((post, index) => ({
  id: `fallback-${index}`,
  slug: post.slug,
  title: post.title,
  excerpt: post.excerpt,
  category: post.category,
  status: "published",
  published_at: post.publishedAt,
  seo_title: post.title,
  seo_description: post.excerpt,
  created_at: post.publishedAt,
  updated_at: post.publishedAt,
  updated_by: null,
  content_json: {
    sections: post.sections,
    author: post.author,
  },
}));
