
-- Mentoring phases table
CREATE TABLE public.mentoring_phases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  phase_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.mentoring_phases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage phases"
  ON public.mentoring_phases FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Mentees can view phases"
  ON public.mentoring_phases FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'mentee'));

-- Mentees profile table
CREATE TABLE public.mentees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.mentees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage mentees"
  ON public.mentees FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Mentees can view own profile"
  ON public.mentees FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Mentee phase progress
CREATE TABLE public.mentee_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  mentee_id UUID NOT NULL REFERENCES public.mentees(id) ON DELETE CASCADE,
  phase_id UUID NOT NULL REFERENCES public.mentoring_phases(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(mentee_id, phase_id)
);

ALTER TABLE public.mentee_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage progress"
  ON public.mentee_progress FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Mentees can view own progress"
  ON public.mentee_progress FOR SELECT
  TO authenticated
  USING (mentee_id IN (SELECT id FROM public.mentees WHERE user_id = auth.uid()));

-- Phase materials/links
CREATE TABLE public.phase_materials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase_id UUID NOT NULL REFERENCES public.mentoring_phases(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  url TEXT,
  material_type TEXT NOT NULL DEFAULT 'link',
  material_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.phase_materials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage materials"
  ON public.phase_materials FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Mentees can view materials"
  ON public.phase_materials FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'mentee'));

-- Triggers for updated_at
CREATE TRIGGER update_mentoring_phases_updated_at
  BEFORE UPDATE ON public.mentoring_phases
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentees_updated_at
  BEFORE UPDATE ON public.mentees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mentee_progress_updated_at
  BEFORE UPDATE ON public.mentee_progress
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_phase_materials_updated_at
  BEFORE UPDATE ON public.phase_materials
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
