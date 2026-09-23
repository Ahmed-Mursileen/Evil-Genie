-- Evil Genie wish log: write-only from the website.
-- Run this once in the Supabase SQL editor.

create table if not exists public.wishes (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  wish text not null check (char_length(wish) between 1 and 300),
  mood text not null check (char_length(mood) <= 20),
  twist text check (char_length(twist) <= 1000),
  flagged boolean not null default false  -- true = self-harm wish, answered with the crisis response
);

alter table public.wishes enable row level security;

-- The site uses the anon key and may only insert. There is deliberately no
-- select/update/delete policy, so nothing can be read back through the API.
drop policy if exists "anon can insert wishes" on public.wishes;
create policy "anon can insert wishes"
  on public.wishes for insert
  to anon
  with check (true);

revoke select, update, delete on public.wishes from anon, authenticated;
grant insert on public.wishes to anon;
