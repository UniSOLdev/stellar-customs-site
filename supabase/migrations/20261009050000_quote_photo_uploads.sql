-- Private customer quote photos.
-- Public users may upload; only authenticated owners may read or delete.

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'quote-uploads',
  'quote-uploads',
  false,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
)
on conflict (id)
do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "quote_upload_insert_anon" on storage.objects;
drop policy if exists "quote_upload_insert_authenticated" on storage.objects;
drop policy if exists "quote_upload_select_owner" on storage.objects;
drop policy if exists "quote_upload_delete_owner" on storage.objects;

create policy "quote_upload_insert_anon"
on storage.objects for insert to anon
with check (bucket_id = 'quote-uploads');

create policy "quote_upload_insert_authenticated"
on storage.objects for insert to authenticated
with check (bucket_id = 'quote-uploads');

create policy "quote_upload_select_owner"
on storage.objects for select to authenticated
using (
  bucket_id = 'quote-uploads'
  and public.is_owner()
);

create policy "quote_upload_delete_owner"
on storage.objects for delete to authenticated
using (
  bucket_id = 'quote-uploads'
  and public.is_owner()
);
