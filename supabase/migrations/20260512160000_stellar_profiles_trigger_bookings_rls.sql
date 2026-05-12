/*
  Additive migration: auto-create profiles on signup, safer default role,
  and explicit public booking insert policies for anon + authenticated.
*/

-- ---------------------------------------------------------------------------
-- Profiles: default new rows to customer (owners are promoted manually)
-- ---------------------------------------------------------------------------
alter table public.profiles
  alter column role set default 'customer';

-- ---------------------------------------------------------------------------
-- Auto-create profile row when a Supabase Auth user is created
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user ()
  returns trigger
  language plpgsql
  security definer
  set search_path = public
as $$
begin
  insert into public.profiles (id, role)
    values (new.id, 'customer')
  on conflict (id)
    do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users for each row
  execute procedure public.handle_new_user ();

-- ---------------------------------------------------------------------------
-- Bookings: replace broad insert policy with explicit roles (public form)
-- ---------------------------------------------------------------------------
drop policy if exists "bookings_insert_public" on public.bookings;

create policy "bookings_insert_anon" on public.bookings for insert to anon
  with check (true);

create policy "bookings_insert_authenticated" on public.bookings for insert to authenticated
  with check (true);
