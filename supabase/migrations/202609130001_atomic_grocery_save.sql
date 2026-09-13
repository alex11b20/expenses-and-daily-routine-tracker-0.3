-- Additive grocery reliability migration. Existing data is not modified.
begin;

create function public.save_shopping_list(p_id uuid, p_title text, p_category text, p_currency text, p_items jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare
  v_owner uuid := auth.uid();
  v_list public.shopping_lists%rowtype;
  v_names jsonb;
  v_expected jsonb;
  v_items jsonb;
begin
  if v_owner is null then raise exception 'Sign in before saving a list.'; end if;
  if p_id is null or p_title is null or length(btrim(p_title)) not between 1 and 200 then
    raise exception 'Enter a list title of 1-200 characters.';
  end if;
  if p_category is null or p_category not in ('Foods','Tools','Car','Project','Other') then raise exception 'Invalid list category.'; end if;
  if p_currency is null or p_currency not in ('RSD','EUR','USD','CHF','GBP','BAM','MKD','RUB','AED','AUD','CAD','JPY','CNY','TRY','SEK','NOK','DKK','PLN','HUF','CZK','BGN','RON') then raise exception 'Invalid currency.'; end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' then raise exception 'Enter a list of items.'; end if;
  if jsonb_array_length(p_items) not between 1 and 500 then raise exception 'Enter between 1 and 500 items.'; end if;
  if exists(select 1 from jsonb_array_elements(p_items) e where jsonb_typeof(e) <> 'string' or length(btrim(e #>> '{}')) not between 1 and 300) then
    raise exception 'Each item must contain 1-300 characters.';
  end if;

  -- Serialize repeated requests for this ID, including simultaneous retries.
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(p_id::text, 0));
  select * into v_list from public.shopping_lists where id = p_id and user_id = v_owner;
  if found then
    select jsonb_agg(name order by name) into v_expected
      from (select btrim(value) as name from jsonb_array_elements_text(p_items)) names;
    select jsonb_agg(item_name order by item_name) into v_names
      from public.shopping_list_items where list_id = p_id and user_id = v_owner;
    if v_list.title is distinct from btrim(p_title) or v_list.category is distinct from p_category
      or v_list.currency is distinct from p_currency or v_names is distinct from v_expected then
      raise exception 'This save already completed with different contents. Reload to review the saved list.';
    end if;
  else
    insert into public.shopping_lists(id,user_id,title,category,currency,estimated_total)
      values(p_id,v_owner,btrim(p_title),p_category,p_currency,null) returning * into v_list;
    insert into public.shopping_list_items(list_id,user_id,item_name,quantity,estimated_price,checked)
      select p_id,v_owner,btrim(value),1,null,false from jsonb_array_elements_text(p_items);
  end if;
  select coalesce(jsonb_agg(jsonb_build_object('id',id,'item_name',item_name,'quantity',quantity,
    'estimated_price',estimated_price,'checked',checked) order by item_name,id),'[]'::jsonb)
    into v_items from public.shopping_list_items where list_id = p_id and user_id = v_owner;
  return jsonb_build_object('id',v_list.id,'title',v_list.title,'category',v_list.category,
    'currency',v_list.currency,'created_at',v_list.created_at,'estimated_total',v_list.estimated_total,
    'shopping_list_items',v_items);
end;
$$;

revoke all on function public.save_shopping_list(uuid,text,text,text,jsonb) from public, anon;
grant execute on function public.save_shopping_list(uuid,text,text,text,jsonb) to authenticated;

-- Bind the submitted draft to the expected session owner, even during an account switch.
create function public.save_shopping_list_for_user(p_user_id uuid, p_id uuid, p_title text, p_category text, p_currency text, p_items jsonb)
returns jsonb language plpgsql security invoker set search_path = '' as $$
begin
  if auth.uid() is null or auth.uid() is distinct from p_user_id then raise exception 'Your session changed. Reload before saving this list.'; end if;
  return public.save_shopping_list(p_id,p_title,p_category,p_currency,p_items);
end;
$$;
revoke all on function public.save_shopping_list_for_user(uuid,uuid,text,text,text,jsonb) from public, anon;
grant execute on function public.save_shopping_list_for_user(uuid,uuid,text,text,text,jsonb) to authenticated;

-- Existing owner policies still apply; this additionally requires an owned parent.
create policy shopping_items_owned_parent on public.shopping_list_items
  as restrictive for all to authenticated
  using (exists(select 1 from public.shopping_lists l where l.id = list_id and l.user_id = auth.uid()))
  with check (exists(select 1 from public.shopping_lists l where l.id = list_id and l.user_id = auth.uid()));

commit;
