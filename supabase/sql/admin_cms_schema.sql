-- Admin CMS schema for NexBuildLabs
-- Run in Supabase SQL editor before using /admin routes.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'editor' check (role in ('super_admin', 'editor')),
  created_at timestamptz not null default now()
);

create table if not exists public.pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft', 'published')),
  layout_mode text not null default 'default' check (layout_mode in ('default', 'cms')),
  meta_title text,
  meta_description text,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.page_sections (
  id uuid primary key default gen_random_uuid(),
  page_id uuid not null references public.pages(id) on delete cascade,
  section_key text not null,
  title text not null,
  content_json jsonb not null default '{}'::jsonb,
  position int not null default 1,
  status text not null default 'draft' check (status in ('draft', 'published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(page_id, section_key)
);

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text not null default '',
  category text not null default 'General',
  content_json jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  url text not null,
  alt_text text,
  mime_type text,
  size_bytes bigint,
  metadata jsonb,
  uploaded_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.menus (
  id uuid primary key default gen_random_uuid(),
  menu_key text not null,
  label text not null,
  path text not null,
  position int not null default 1,
  is_cta boolean not null default false,
  is_external boolean not null default false,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  key text primary key,
  value_json jsonb not null default '""'::jsonb,
  updated_by uuid references auth.users(id),
  updated_at timestamptz not null default now()
);

alter table public.contact_submissions
  add column if not exists status text default 'new';

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists pages_set_updated_at on public.pages;
create trigger pages_set_updated_at before update on public.pages
for each row execute procedure public.set_updated_at();

drop trigger if exists page_sections_set_updated_at on public.page_sections;
create trigger page_sections_set_updated_at before update on public.page_sections
for each row execute procedure public.set_updated_at();

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at before update on public.posts
for each row execute procedure public.set_updated_at();

drop trigger if exists media_assets_set_updated_at on public.media_assets;
create trigger media_assets_set_updated_at before update on public.media_assets
for each row execute procedure public.set_updated_at();

drop trigger if exists menus_set_updated_at on public.menus;
create trigger menus_set_updated_at before update on public.menus
for each row execute procedure public.set_updated_at();

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at before update on public.site_settings
for each row execute procedure public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.pages enable row level security;
alter table public.page_sections enable row level security;
alter table public.posts enable row level security;
alter table public.media_assets enable row level security;
alter table public.menus enable row level security;
alter table public.site_settings enable row level security;

create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.admin_users
    where id = _user_id
  );
$$;

-- Public read for published content
create policy if not exists pages_public_read on public.pages
for select using (status = 'published');

create policy if not exists sections_public_read on public.page_sections
for select using (
  status = 'published'
  and exists (select 1 from public.pages p where p.id = page_id and p.status = 'published')
);

create policy if not exists posts_public_read on public.posts
for select using (status = 'published');

create policy if not exists menus_public_read on public.menus
for select using (is_active = true);

create policy if not exists settings_public_read on public.site_settings
for select using (true);

-- Admin full control
create policy if not exists admin_users_self_read on public.admin_users
for select using (auth.uid() = id);

create policy if not exists pages_admin_all on public.pages
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists sections_admin_all on public.page_sections
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists posts_admin_all on public.posts
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists media_admin_all on public.media_assets
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists menus_admin_all on public.menus
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists settings_admin_all on public.site_settings
for all using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

create policy if not exists leads_admin_read on public.contact_submissions
for select using (public.is_admin(auth.uid()));

create policy if not exists leads_admin_update on public.contact_submissions
for update using (public.is_admin(auth.uid())) with check (public.is_admin(auth.uid()));

-- Seed default page skeleton
insert into public.pages (slug, title, status, layout_mode)
values
  ('home', 'Home', 'published', 'default'),
  ('services', 'Services', 'published', 'default'),
  ('case-studies', 'Case Studies', 'published', 'default'),
  ('about', 'About', 'published', 'default'),
  ('contact', 'Contact', 'published', 'default')
on conflict (slug) do nothing;

-- Seed menus
insert into public.menus (menu_key, label, path, position, is_cta, is_active)
values
  ('header', 'Home', '/', 1, false, true),
  ('header', 'Services', '/services', 2, false, true),
  ('header', 'Case Studies', '/case-studies', 3, false, true),
  ('header', 'About', '/about', 4, false, true),
  ('header', 'Blog', '/blog', 5, false, true),
  ('header', 'Contact', '/contact', 6, true, true),
  ('footer', 'Services', '/services', 1, false, true),
  ('footer', 'About', '/about', 2, false, true),
  ('footer', 'Case Studies', '/case-studies', 3, false, true),
  ('footer', 'Blog', '/blog', 4, false, true),
  ('footer', 'Contact', '/contact', 5, true, true)
on conflict do nothing;

insert into public.site_settings (key, value_json)
values
  ('brand_name', '"NexBuildLabs"'::jsonb),
  ('brand_tagline', '"Data-driven digital growth for startups and businesses ready to scale."'::jsonb),
  ('primary_cta_label', '"Get Free Audit"'::jsonb),
  ('primary_cta_link', '"/contact"'::jsonb),
  ('contact_email', '"business@nexbuildlabs.com"'::jsonb),
  ('contact_phone', '"+91 75890-78348"'::jsonb),
  ('website_url', '"https://nexbuildlabs.com"'::jsonb)
on conflict (key) do nothing;

-- Seed one admin role manually after creating auth user:
-- insert into public.admin_users(id, role) values ('<auth_user_uuid>', 'super_admin');
