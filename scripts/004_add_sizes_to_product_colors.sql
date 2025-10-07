-- Add sizes column to product_colors table to support size quantities per color
-- This allows each color variant to have different size assortments with quantities

ALTER TABLE product_colors 
ADD COLUMN IF NOT EXISTS sizes JSONB DEFAULT '[]'::jsonb;

-- Add a comment to explain the column structure
COMMENT ON COLUMN product_colors.sizes IS 'Array of size objects with quantity, e.g. [{"size": "XL", "quantity": 2}, {"size": "S", "quantity": 3}]';

-- Update existing records to have empty array if null
UPDATE product_colors 
SET sizes = '[]'::jsonb 
WHERE sizes IS NULL;
