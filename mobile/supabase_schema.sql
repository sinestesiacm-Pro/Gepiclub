-- =========================================================
-- GEPICLUB TRAVEL - SCHEMA SUPABASE PER PROFILI & CLUB VIP
-- Esegui questo script nel Supabase SQL Editor
-- =========================================================

-- 1. Tabella dei Profili Soci
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  vip_card_number text default '••••  ••••  ••••  8829',
  membership_tier text default 'GOLD_VIP', -- 'BLACK_ELITE', 'GOLD_VIP', 'SILVER', 'STANDARD'
  club_points integer default 5000,
  phone text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Sicurezza (Row Level Security)
alter table public.profiles enable row level security;

create policy "I soci possono visualizzare il proprio profilo"
  on public.profiles for select
  using ( auth.uid() = id );

create policy "I soci possono aggiornare il proprio profilo"
  on public.profiles for update
  using ( auth.uid() = id );

create policy "I soci possono inserire il proprio profilo"
  on public.profiles for insert
  with check ( auth.uid() = id );

-- 3. Funzione & Trigger automatico alla registrazione
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (
    id,
    email,
    full_name,
    vip_card_number,
    membership_tier,
    club_points
  )
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', 'Socio Gepiclub'),
    '••••  ••••  ••••  ' || lpad(floor(random() * 9000 + 1000)::text, 4, '0'),
    'GOLD_VIP',
    5000
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
