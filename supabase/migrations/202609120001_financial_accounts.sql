-- Additive account foundation; existing transactions remain unassigned until reviewed.
begin;
create table if not exists public.financial_accounts (
 id uuid primary key default gen_random_uuid(),
 owner_user_id uuid not null default auth.uid() references auth.users(id),
 name text not null check (length(trim(name)) between 1 and 100),
 currency text not null check (currency in ('RSD','EUR','USD','CHF','GBP','BAM','MKD','RUB','AED','AUD','CAD','JPY','CNY','TRY','SEK','NOK','DKK','PLN','HUF','CZK','BGN','RON')),
 opening_balance numeric(16,2) not null check (abs(opening_balance) <= 9000000000000),
 opening_date date not null,
 created_at timestamptz not null default now(),
 unique (id, owner_user_id), unique (owner_user_id),
 check (currency <> 'JPY' or opening_balance = trunc(opening_balance))
);
alter table public.financial_accounts enable row level security;
create policy "Owners read accounts" on public.financial_accounts for select to authenticated using (owner_user_id = auth.uid());
create policy "Owners create accounts" on public.financial_accounts for insert to authenticated with check (owner_user_id = auth.uid());
revoke all on public.financial_accounts from anon, authenticated;
grant select, insert on public.financial_accounts to authenticated;
alter table public.transactions add column if not exists account_id uuid;
alter table public.transactions add constraint transactions_account_owner_fk foreign key (account_id, user_id) references public.financial_accounts(id, owner_user_id);
create index if not exists transactions_owner_date_id_idx on public.transactions(user_id, transaction_date desc, id desc);
notify pgrst, 'reload schema';
commit;
