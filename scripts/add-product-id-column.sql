-- Add product_id column to products table
ALTER TABLE products 
ADD COLUMN product_id TEXT UNIQUE;

-- Add index for faster lookups
CREATE INDEX idx_products_product_id ON products(product_id);

-- Add comment
COMMENT ON COLUMN products.product_id IS 'User-defined product code (e.g., DRESS-001)';
