/*
  Stellar Customs — core tables, RLS, storage buckets.
  Run via Supabase CLI or paste into SQL Editor.

  Buckets: stellar-gallery (public read URLs), stellar-products (public read).
  Owner writes: profiles.role = 'owner' via is_owner().
*/

-- ---------------------------------------------------------------------------
-- Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'owner',
  created_at timestamptz not null default now(),
  constraint profiles_id_unique unique (id)
);

create table if not exists public.gallery_images (
  id uuid primary key default gen_random_uuid (),
  image_url text not null,
  caption text,
  created_at timestamptz not null default now ()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid (),
  title text not null,
  description text,
  price text,
  created_at timestamptz not null default now ()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid (),
  name text not null,
  description text,
  price text,
  image_url text,
  created_at timestamptz not null default now ()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid (),
  customer_name text not null,
  review_text text not null,
  rating int not null,
  created_at timestamptz not null default now (),
  constraint reviews_rating_range check (
    rating between 1 and 5
  )
);

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid (),
  name text,
  phone text,
  email text,
  vehicle text,
  service text,
  date text,
  notes text,
  created_at timestamptz not null default now ()
);

-- ---------------------------------------------------------------------------
-- Owner helper (SECURITY DEFINER — safe search_path)
-- ---------------------------------------------------------------------------
create or replace function public.is_owner ()
  returns boolean
  language sql
  security definer
  set search_path = public
  stable
as $$
  select exists (
    select
      1
    from
      public.profiles p
    where
      p.id = auth.uid ()
      and p.role = 'owner');
$$;

grant execute on function public.is_owner () to anon, authenticated, service_role;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;

alter table public.gallery_images enable row level security;

alter table public.services enable row level security;

alter table public.products enable row level security;

alter table public.reviews enable row level security;

alter table public.bookings enable row level security;

-- profiles: read own row (session / layout guard)
create policy "profiles_select_own" on public.profiles for select to authenticated using (auth.uid () = id);

-- gallery: public read, owner write
create policy "gallery_select_public" on public.gallery_images for select
  using (true);

create policy "gallery_insert_owner" on public.gallery_images for insert to authenticated
  with check (is_owner ());

create policy "gallery_update_owner" on public.gallery_images for update to authenticated
  using (is_owner ())
  with check (is_owner ());

create policy "gallery_delete_owner" on public.gallery_images for delete to authenticated
  using (is_owner ());

-- services
create policy "services_select_public" on public.services for select
  using (true);

create policy "services_insert_owner" on public.services for insert to authenticated
  with check (is_owner ());

create policy "services_update_owner" on public.services for update to authenticated
  using (is_owner ())
  with check (is_owner ());

create policy "services_delete_owner" on public.services for delete to authenticated
  using (is_owner ());

-- products
create policy "products_select_public" on public.products for select
  using (true);

create policy "products_insert_owner" on public.products for insert to authenticated
  with check (is_owner ());

create policy "products_update_owner" on public.products for update to authenticated
  using (is_owner ())
  with check (is_owner ());

create policy "products_delete_owner" on public.products for delete to authenticated
  using (is_owner ());

-- reviews
create policy "reviews_select_public" on public.reviews for select
  using (true);

create policy "reviews_insert_owner" on public.reviews for insert to authenticated
  with check (is_owner ());

create policy "reviews_update_owner" on public.reviews for update to authenticated
  using (is_owner ())
  with check (is_owner ());

create policy "reviews_delete_owner" on public.reviews for delete to authenticated
  using (is_owner ());

-- bookings: public insert (booking form), owner read/delete
create policy "bookings_insert_public" on public.bookings for insert
  with check (true);

create policy "bookings_select_owner" on public.bookings for select to authenticated
  using (is_owner ());

create policy "bookings_delete_owner" on public.bookings for delete to authenticated
  using (is_owner ());

-- ---------------------------------------------------------------------------
-- Storage buckets + policies (idempotent policy names)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('stellar-gallery', 'stellar-gallery', true),
('stellar-products', 'stellar-products', true)
on conflict (id)
  do update set
    public = excluded.public;

drop policy if exists "storage_public_read_gallery" on storage.objects;

drop policy if exists "storage_public_read_products" on storage.objects;

drop policy if exists "storage_owner_insert_gallery" on storage.objects;

drop policy if exists "storage_owner_update_gallery" on storage.objects;

drop policy if exists "storage_owner_delete_gallery" on storage.objects;

drop policy if exists "storage_owner_insert_products" on storage.objects;

drop policy if exists "storage_owner_update_products" on storage.objects;

drop policy if exists "storage_owner_delete_products" on storage.objects;

-- Public read — bucket URLs work with public buckets (signed URLs optional).
create policy "storage_public_read_gallery" on storage.objects for select to public
  using (bucket_id = 'stellar-gallery');

create policy "storage_public_read_products" on storage.objects for select to public
  using (bucket_id = 'stellar-products');

-- Owner-only write
create policy "storage_owner_insert_gallery" on storage.objects for insert to authenticated
  with check (bucket_id = 'stellar-gallery'
  and public.is_owner ());

create policy "storage_owner_update_gallery" on storage.objects for update to authenticated
  using (bucket_id = 'stellar-gallery'
  and public.is_owner ())
  with check (bucket_id = 'stellar-gallery'
  and public.is_owner ());

create policy "storage_owner_delete_gallery" on storage.objects for delete to authenticated
  using (bucket_id = 'stellar-gallery'
  and public.is_owner ());

create policy "storage_owner_insert_products" on storage.objects for insert to authenticated
  with check (bucket_id = 'stellar-products'
  and public.is_owner ());

create policy "storage_owner_update_products" on storage.objects for update to authenticated
  using (bucket_id = 'stellar-products'
  and public.is_owner ())
  with check (bucket_id = 'stellar-products'
  and public.is_owner ());

create policy "storage_owner_delete_products" on storage.objects for delete to authenticated
  using (bucket_id = 'stellar-products'
  and public.is_owner ());
