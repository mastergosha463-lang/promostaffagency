create table if not exists public.client_errors (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null,
  message text,
  source text,
  lineno int,
  colno int,
  stack text,
  page_path text,
  user_agent text,
  url text,
  extra jsonb
);

alter table public.client_errors enable row level security;

create policy "Anyone can insert client errors"
  on public.client_errors
  for insert
  to anon, authenticated
  with check (true);

create policy "Admins can read client errors"
  on public.client_errors
  for select
  to authenticated
  using (public.has_role(auth.uid(), 'admin'));

create index if not exists client_errors_created_at_idx on public.client_errors (created_at desc);