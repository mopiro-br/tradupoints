
-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'Artigo',
  read_time TEXT NOT NULL DEFAULT '5 min',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role app_role NOT NULL DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Blog posts policies
CREATE POLICY "Anyone can read published posts"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Admins can manage all posts"
  ON public.blog_posts FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Admins can view roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Updated_at trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Seed existing posts
INSERT INTO public.blog_posts (slug, title, excerpt, content, category, read_time, published) VALUES
('bastidores-traducao-simultanea-congresso-medico', 'Bastidores da tradução simultânea em um congresso médico internacional', 'Descubra o que acontece nos bastidores de um congresso médico internacional e como a preparação meticulosa garante uma tradução simultânea impecável.', 'A tradução simultânea em congressos médicos internacionais é uma das atividades mais desafiadoras e fascinantes do mundo da interpretação profissional...', 'Bastidores', '8 min', true),
('tecnologia-byod-eventos-corporativos', 'Tecnologia BYOD: o futuro da tradução em eventos corporativos', 'Entenda como a tecnologia BYOD está revolucionando a forma como eventos corporativos oferecem tradução simultânea aos participantes.', 'A tecnologia BYOD (Bring Your Own Device) está transformando radicalmente a forma como eventos corporativos oferecem serviços de tradução simultânea...', 'Tecnologia', '6 min', true),
('contextualizacao-tecnica-traducao-simultanea', 'Por que a contextualização técnica é essencial na tradução simultânea', 'Saiba por que intérpretes profissionais investem horas em preparação técnica antes de cada evento e como isso impacta a qualidade da tradução.', 'A contextualização técnica é frequentemente o diferencial entre uma tradução simultânea medíocre e uma excepcional...', 'Técnica', '7 min', true);
