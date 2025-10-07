-- Update products.sizes_included from ARRAY to JSONB to support size-quantity objects
ALTER TABLE products 
ALTER COLUMN sizes_included TYPE jsonb USING sizes_included::jsonb;

-- Update any existing string array data to the new format
UPDATE products 
SET sizes_included = (
  SELECT jsonb_agg(
    jsonb_build_object('size', elem::text, 'quantity', 1)
  )
  FROM jsonb_array_elements_text(sizes_included::jsonb) AS elem
)
WHERE jsonb_typeof(sizes_included::jsonb) = 'array' 
  AND sizes_included::jsonb->0 ? 'size' = false;
