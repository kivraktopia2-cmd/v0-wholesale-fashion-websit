-- Ensure the generate_order_number function exists
create or replace function generate_order_number()
returns text as $$
declare
  new_number text;
  counter int;
begin
  -- Get the count of orders today
  select count(*) into counter
  from public.orders
  where date(created_at) = current_date;
  
  -- Generate order number: ORD-YYYYMMDD-XXXX
  new_number := 'ORD-' || to_char(current_date, 'YYYYMMDD') || '-' || lpad((counter + 1)::text, 4, '0');
  
  return new_number;
end;
$$ language plpgsql;
