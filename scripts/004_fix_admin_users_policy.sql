-- Drop the problematic recursive policy
drop policy if exists "Admins can view admin users" on public.admin_users;

-- Create a new policy that allows authenticated users to read admin_users
-- This prevents infinite recursion because it doesn't query admin_users within the policy
create policy "Authenticated users can view admin users"
  on public.admin_users for select
  using (auth.uid() is not null);

-- Allow admins to manage admin users (insert, update, delete)
-- We use auth.uid() = id to allow users to manage their own record
create policy "Users can manage their own admin record"
  on public.admin_users for all
  using (auth.uid() = id)
  with check (auth.uid() = id);
