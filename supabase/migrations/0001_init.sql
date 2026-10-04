-- CraveCrunch initial schema. Apply with `supabase db push` or paste into the Supabase SQL editor.
create extension if not exists postgis;

create table profiles (
  id uuid primary key references auth.users on delete cascade,
  username text unique not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

create table taste_profiles (
  user_id uuid primary key references profiles on delete cascade,
  likes text[] not null default '{}',
  dislikes text[] not null default '{}',
  dietary text[] not null default '{}',
  allergies text[] not null default '{}',
  max_price smallint not null default 2 check (max_price between 1 and 4),
  updated_at timestamptz not null default now()
);

create table restaurants (
  id uuid primary key default gen_random_uuid(),
  place_id text unique,               -- Google Places id when it came from Places
  name text not null,
  cuisine text[] not null default '{}',
  price_level smallint check (price_level between 1 and 4),
  location geography(point, 4326) not null,
  is_chain boolean not null default false,
  submitted_by uuid references profiles on delete set null,  -- gems added by users
  verified boolean not null default false,
  created_at timestamptz not null default now()
);
create index restaurants_location_idx on restaurants using gist (location);

-- Vibe tag ids match VIBE_TAGS in packages/core/src/vibes.ts.
create table restaurant_vibes (
  restaurant_id uuid references restaurants on delete cascade,
  vibe text not null,
  votes integer not null default 0,
  primary key (restaurant_id, vibe)
);

create table reviews (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references restaurants on delete cascade,
  author_id uuid not null references profiles on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  body text,
  created_at timestamptz not null default now(),
  unique (restaurant_id, author_id)
);

-- Reddit-style threads: a post belongs to a restaurant or a city board.
create table posts (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid references restaurants on delete cascade,
  city text,
  author_id uuid not null references profiles on delete cascade,
  title text not null,
  body text,
  created_at timestamptz not null default now(),
  check (restaurant_id is not null or city is not null)
);

create table comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references posts on delete cascade,
  parent_id uuid references comments on delete cascade,
  author_id uuid not null references profiles on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table votes (
  user_id uuid not null references profiles on delete cascade,
  target_type text not null check (target_type in ('post', 'comment', 'restaurant')),
  target_id uuid not null,
  value smallint not null check (value in (-1, 1)),
  created_at timestamptz not null default now(),
  primary key (user_id, target_type, target_id)
);

-- Row level security: everyone can read, people can only write their own rows.
alter table profiles enable row level security;
alter table taste_profiles enable row level security;
alter table restaurants enable row level security;
alter table restaurant_vibes enable row level security;
alter table reviews enable row level security;
alter table posts enable row level security;
alter table comments enable row level security;
alter table votes enable row level security;

create policy "public read" on profiles for select using (true);
create policy "own profile" on profiles for all using (auth.uid() = id) with check (auth.uid() = id);
create policy "own taste profile" on taste_profiles for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "public read" on restaurants for select using (true);
create policy "submit gems" on restaurants for insert with check (auth.uid() = submitted_by);
create policy "public read" on restaurant_vibes for select using (true);
create policy "public read" on reviews for select using (true);
create policy "own reviews" on reviews for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "public read" on posts for select using (true);
create policy "own posts" on posts for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "public read" on comments for select using (true);
create policy "own comments" on comments for all using (auth.uid() = author_id) with check (auth.uid() = author_id);
create policy "public read" on votes for select using (true);
create policy "own votes" on votes for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
