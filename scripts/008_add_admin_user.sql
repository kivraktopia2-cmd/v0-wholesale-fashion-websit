-- Script to add a new admin user
-- 
-- IMPORTANT: Before running this script, you need to:
-- 1. Go to Supabase Dashboard > Authentication > Users
-- 2. Click "Add user" and create a new user with email and password
-- 3. Copy the user's UUID from the dashboard
-- 4. Replace 'USER_UUID_HERE' and 'user@example.com' below with the actual values
-- 5. Run this script

-- Example: Add a new admin user
-- Replace these values with actual user data:
INSERT INTO public.admin_users (id, email, full_name, is_active)
VALUES (
  'USER_UUID_HERE'::uuid,  -- Replace with the UUID from Supabase Auth dashboard
  'user@example.com',       -- Replace with the user's email
  'Admin User Name',        -- Replace with the user's full name
  true
)
ON CONFLICT (id) DO UPDATE
SET 
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  is_active = EXCLUDED.is_active;

-- To add multiple admin users, copy the INSERT statement above and modify the values

-- Example for multiple users:
-- INSERT INTO public.admin_users (id, email, full_name, is_active)
-- VALUES 
--   ('uuid-1'::uuid, 'admin1@direnber.pl', 'Admin One', true),
--   ('uuid-2'::uuid, 'admin2@direnber.pl', 'Admin Two', true),
--   ('uuid-3'::uuid, 'admin3@direnber.pl', 'Admin Three', true)
-- ON CONFLICT (id) DO UPDATE
-- SET 
--   email = EXCLUDED.email,
--   full_name = EXCLUDED.full_name,
--   is_active = EXCLUDED.is_active;
