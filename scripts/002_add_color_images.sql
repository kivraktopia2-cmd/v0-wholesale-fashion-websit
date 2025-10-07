-- Add color_id column to product_images table to support per-color images
alter table public.product_images 
add column if not exists color_id uuid references public.product_colors(id) on delete cascade;

-- Create index for better query performance
create index if not exists idx_product_images_color_id on public.product_images(color_id);

-- Update the existing index to be a composite index
drop index if exists idx_product_images_product_id;
create index if not exists idx_product_images_product_color on public.product_images(product_id, color_id);

-- Note: Existing images without color_id will be treated as general product images
-- New images can be associated with specific colors
