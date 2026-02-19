
-- Add policy so mentees can view their own role (useful for client-side role checks)
CREATE POLICY "Users can view own role"
ON public.user_roles
FOR SELECT
USING (user_id = auth.uid());
