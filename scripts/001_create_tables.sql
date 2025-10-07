-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Categories table (main categories like "Zimowa", "Letnia", "Sezonowa")
create table if not exists public.categories (
  id uuid primary key default uuid_generate_v4(),
  name_pl text not null,
  slug text unique not null,
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- Subcategories table (like "Sukienki", "Spódnice", "Bluzki")
create table if not exists public.subcategories (
  id uuid primary key default uuid_generate_v4(),
  category_id uuid references public.categories(id) on delete cascade,
  name_pl text not null,
  slug text unique not null,
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- Products table
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  subcategory_id uuid references public.subcategories(id) on delete set null,
  name_pl text not null,
  slug text unique not null,
  description_pl text,
  price_pln decimal(10, 2) not null,
  sizes_included text[] not null, -- Array of sizes like ['S', 'M', 'L', 'XL', 'XXL']
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Product colors table (products can have multiple colors)
create table if not exists public.product_colors (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  color_name_pl text not null,
  color_hex text not null,
  stock_quantity int default 0,
  created_at timestamp with time zone default now()
);

-- Product images table (multiple images per product)
create table if not exists public.product_images (
  id uuid primary key default uuid_generate_v4(),
  product_id uuid references public.products(id) on delete cascade,
  image_url text not null,
  display_order int default 0,
  created_at timestamp with time zone default now()
);

-- Admin users table (for admin panel access)
create table if not exists public.admin_users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  full_name text,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Cart items table (for shopping cart)
create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  session_id text not null,
  product_id uuid references public.products(id) on delete cascade,
  color_id uuid references public.product_colors(id) on delete cascade,
  quantity int default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security on all tables
alter table public.categories enable row level security;
alter table public.subcategories enable row level security;
alter table public.products enable row level security;
alter table public.product_colors enable row level security;
alter table public.product_images enable row level security;
alter table public.admin_users enable row level security;
alter table public.cart_items enable row level security;

-- Public read access for categories, subcategories, products, colors, and images
create policy "Public can view active categories"
  on public.categories for select
  using (true);

create policy "Public can view active subcategories"
  on public.subcategories for select
  using (true);

create policy "Public can view active products"
  on public.products for select
  using (is_active = true);

create policy "Public can view product colors"
  on public.product_colors for select
  using (true);

create policy "Public can view product images"
  on public.product_images for select
  using (true);

-- Admin-only write access for categories
create policy "Admins can insert categories"
  on public.categories for insert
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can update categories"
  on public.categories for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can delete categories"
  on public.categories for delete
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admin-only write access for subcategories
create policy "Admins can insert subcategories"
  on public.subcategories for insert
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can update subcategories"
  on public.subcategories for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can delete subcategories"
  on public.subcategories for delete
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admin-only write access for products
create policy "Admins can insert products"
  on public.products for insert
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can update products"
  on public.products for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can delete products"
  on public.products for delete
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admin-only write access for product colors
create policy "Admins can insert product colors"
  on public.product_colors for insert
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can update product colors"
  on public.product_colors for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can delete product colors"
  on public.product_colors for delete
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admin-only write access for product images
create policy "Admins can insert product images"
  on public.product_images for insert
  with check (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can update product images"
  on public.product_images for update
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

create policy "Admins can delete product images"
  on public.product_images for delete
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Admin users policies
create policy "Admins can view admin users"
  on public.admin_users for select
  using (
    exists (
      select 1 from public.admin_users
      where id = auth.uid() and is_active = true
    )
  );

-- Cart items policies (session-based)
create policy "Users can view their own cart items"
  on public.cart_items for select
  using (true);

create policy "Users can insert cart items"
  on public.cart_items for insert
  with check (true);

create policy "Users can update their own cart items"
  on public.cart_items for update
  using (true);

create policy "Users can delete their own cart items"
  on public.cart_items for delete
  using (true);

-- Create indexes for better performance
create index if not exists idx_subcategories_category_id on public.subcategories(category_id);
create index if not exists idx_products_subcategory_id on public.products(subcategory_id);
create index if not exists idx_product_colors_product_id on public.product_colors(product_id);
create index if not exists idx_product_images_product_id on public.product_images(product_id);
create index if not exists idx_cart_items_session_id on public.cart_items(session_id);
create index if not exists idx_cart_items_product_id on public.cart_items(product_id);
