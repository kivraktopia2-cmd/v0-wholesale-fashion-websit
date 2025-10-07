-- Drop and recreate sizes_included column as JSONB
-- This is the cleanest approach for development

-- First, drop the old column
ALTER TABLE products DROP COLUMN IF EXISTS sizes_included;

-- Create new JSONB column
ALTER TABLE products ADD COLUMN sizes_included JSONB DEFAULT '[]'::jsonb;

-- Add a comment explaining the structure
COMMENT ON COLUMN products.sizes_included IS 'Array of size objects with quantities: [{"size": "M", "quantity": 2}, {"size": "L", "quantity": 3}]';

-- Ensure product_colors.sizes is also JSONB (it should be already, but let's make sure)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'product_colors' 
    AND column_name = 'sizes' 
    AND data_type = 'jsonb'
  ) THEN
    -- If sizes column doesn't exist or is wrong type, add/fix it
    ALTER TABLE product_colors DROP COLUMN IF EXISTS sizes;
    ALTER TABLE product_colors ADD COLUMN sizes JSONB DEFAULT '[]'::jsonb;
    COMMENT ON COLUMN product_colors.sizes IS 'Array of size objects with quantities: [{"size": "M", "quantity": 2}]';
  END IF;
END $$;
