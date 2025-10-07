-- Update sizes_included column from ARRAY to JSONB to support size quantities
-- This allows storing objects like [{"size": "XL", "quantity": 2}] instead of just ["XL", "S"]

-- First, convert existing data to JSONB format
-- Old format: ["XL", "S", "M"] -> New format: [{"size": "XL", "quantity": 1}, {"size": "S", "quantity": 1}]
UPDATE products
SET sizes_included = (
  SELECT jsonb_agg(jsonb_build_object('size', elem, 'quantity', 1))
  FROM unnest(sizes_included) AS elem
)::text::jsonb
WHERE sizes_included IS NOT NULL;

-- Now alter the column type to JSONB
ALTER TABLE products 
ALTER COLUMN sizes_included TYPE jsonb 
USING sizes_included::text::jsonb;

-- Add a comment to document the new format
COMMENT ON COLUMN products.sizes_included IS 'Array of size objects with quantities, e.g., [{"size": "XL", "quantity": 2}]';
