-- Orders table to store customer orders
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  order_number text unique not null,
  
  -- Customer information
  customer_name text not null,
  customer_email text not null,
  customer_phone text not null,
  company_name text,
  nip text,
  
  -- Shipping address
  shipping_street text not null,
  shipping_city text not null,
  shipping_postal_code text not null,
  shipping_country text not null default 'Polska',
  
  -- Billing address (optional, if different from shipping)
  billing_street text,
  billing_city text,
  billing_postal_code text,
  billing_country text,
  
  -- Order totals
  subtotal_net decimal(10, 2) not null,
  vat_amount decimal(10, 2) not null,
  total_gross decimal(10, 2) not null,
  
  -- Order status
  status text not null default 'pending', -- pending, confirmed, processing, shipped, delivered, cancelled
  notes text,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Order items table to store individual products in each order
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  color_id uuid references public.product_colors(id) on delete set null,
  
  -- Product details (stored for historical record)
  product_name text not null,
  color_name text not null,
  sizes_included text[] not null,
  price_per_unit decimal(10, 2) not null,
  quantity int not null,
  
  -- Item totals
  subtotal_net decimal(10, 2) not null,
  vat_amount decimal(10, 2) not null,
  total_gross decimal(10, 2) not null,
  
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public can insert orders (for checkout)
create policy "Anyone can create orders"
  on public.orders for insert
  with check (true);

-- Public can insert order items (for checkout)
create policy "Anyone can create order items"
  on public.order_items for insert
  with check (true);

-- Admins can view all orders
create policy "Admins can view all orders"
  on public.orders for select
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admins can view all order items
create policy "Admins can view all order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admins can update orders
create policy "Admins can update orders"
  on public.orders for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Create indexes for better performance
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_status on public.orders(status);
create index if not exists idx_orders_created_at on public.orders(created_at);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_product_id on public.order_items(product_id);

-- Function to generate order number
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
