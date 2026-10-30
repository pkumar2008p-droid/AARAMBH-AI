-- AARAMBH: run this ONCE in Supabase -> SQL Editor -> New query -> Run
create extension if not exists pgcrypto;

create table public.staff (
  id uuid primary key default gen_random_uuid(),
  staff_code text unique not null,
  role text not null check (role in ('doctor','nurse','clinician','ward','pharmacist','admin')),
  name text not null,
  dept text not null,
  pw_hash text not null,
  failed_count int not null default 0,
  locked_until timestamptz,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.patients (
  id uuid primary key default gen_random_uuid(),
  phone_hash text unique not null,          -- HMAC blind index (lookup only)
  pii text not null,                        -- AES (Fernet) encrypted: name, phone, alt, area, lat, lng
  age int,
  lang text not null default 'en' check (lang in ('en','hi','pa')),
  shared_phone boolean not null default false,
  missed_before int not null default 0,
  digital_access text not null default 'good',
  is_demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.followups (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  title text not null, dept text not null, doctor text not null,
  due date not null, time text not null,
  secret text not null,                     -- encrypted: instructions, docs, doctor note
  docs_ready int[] not null default '{}',
  barriers text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending','completed','closed')),
  confirmed boolean not null default false,
  plan_approved boolean not null default false,
  plan_approved_by text,
  resched_date date, resched_reason text,
  callback boolean not null default false,
  escalated boolean not null default false,
  outcome text, completed_on date,
  created_at timestamptz not null default now()
);
create index on public.followups(patient_id);
create index on public.followups(doctor);

create table public.contacts (
  id uuid primary key default gen_random_uuid(),
  followup_id uuid not null references public.followups(id) on delete cascade,
  at date not null, by_name text not null, mode text not null, result text not null,
  note_enc text,
  created_at timestamptz not null default now()
);
create index on public.contacts(followup_id);

create table public.rx (
  id uuid primary key default gen_random_uuid(),
  followup_id uuid not null references public.followups(id) on delete cascade,
  patient_id uuid not null references public.patients(id) on delete cascade,
  items_enc text not null,
  status text not null default 'pending' check (status in ('pending','dispensed'))
);

create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  followup_id uuid references public.followups(id) on delete cascade,
  type text not null, from_loc text, to_loc text, when_txt text,
  status text not null default 'open' check (status in ('open','done')),
  source text
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  token_hash text unique not null,
  kind text not null check (kind in ('patient','staff')),
  subject uuid not null,
  ip_hash text,
  created_at timestamptz not null default now(),
  last_seen timestamptz not null default now(),
  expires_at timestamptz not null
);

create table public.otps (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.patients(id) on delete cascade,
  code_hash text not null,
  attempts int not null default 0,
  used boolean not null default false,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null
);
create index on public.otps(patient_id);

create table public.audit_logs (
  id bigserial primary key,
  at timestamptz not null default now(),
  actor text, role text, action text not null, entity text, entity_id text, ip text
);

-- AI self-learning
create table public.risk_snapshots (
  followup_id uuid primary key references public.followups(id) on delete cascade,
  features jsonb not null,
  captured_at timestamptz not null default now()
);
create table public.training_samples (
  id uuid primary key default gen_random_uuid(),
  followup_id uuid unique references public.followups(id) on delete set null,
  features jsonb not null,
  label int not null check (label in (0,1)),
  created_at timestamptz not null default now()
);
create table public.ml_models (
  id uuid primary key default gen_random_uuid(),
  name text, storage_path text not null, sha256 text not null,
  threshold float, n_samples int, metrics jsonb,
  active boolean not null default false,
  trained_at timestamptz not null default now()
);

-- LOCK EVERYTHING: Row Level Security ON, zero access for the public (anon) key.
-- Only the backend (service_role key, kept secret on the server) can read/write.
do $$ declare r record; begin
  for r in select tablename from pg_tables where schemaname = 'public' loop
    execute format('alter table public.%I enable row level security', r.tablename);
    execute format('revoke all on table public.%I from anon, authenticated', r.tablename);
  end loop;
end $$;
revoke all on all sequences in schema public from anon, authenticated;
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema public revoke all on sequences from anon, authenticated;

-- Private bucket for trained AI models
insert into storage.buckets (id, name, public) values ('models', 'models', false) on conflict (id) do nothing;
