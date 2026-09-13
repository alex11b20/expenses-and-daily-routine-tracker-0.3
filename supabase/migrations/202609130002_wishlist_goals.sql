-- Private savings/purchase goals; never debits or transactions.
begin;
create table public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id),
  title text not null check (length(btrim(title)) between 1 and 200),
  price numeric(16,2) not null check (price > 0 and price <= 9000000000000),
  currency text not null check (currency in ('RSD','EUR','USD','CHF','GBP','BAM','MKD','RUB','AED','AUD','CAD','JPY','CNY','TRY','SEK','NOK','DKK','PLN','HUF','CZK','BGN','RON')),
  priority text not null default 'Medium' check (priority in ('High','Medium','Low')),
  category text not null default 'Other' check (category in ('Tech & Gadgets','Fashion','Home & Furniture','Animals & Farm','Travel & Fun','Other')),
  notes text not null default '' check (length(notes) <= 2000),
  target_date date,
  archived_at timestamptz,
  created_at timestamptz not null default now(),
  check (currency <> 'JPY' or price = trunc(price))
);
alter table public.wishlist_items enable row level security;
revoke all on public.wishlist_items from anon, authenticated;
grant select, insert, update on public.wishlist_items to authenticated;
create policy wishlist_owner_read on public.wishlist_items for select to authenticated using (user_id = auth.uid());
create policy wishlist_owner_insert on public.wishlist_items for insert to authenticated with check (user_id = auth.uid());
create policy wishlist_owner_update on public.wishlist_items for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create index wishlist_owner_id_idx on public.wishlist_items(user_id,id);
commit;
