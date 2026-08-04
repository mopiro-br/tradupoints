import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-horizontal.png";
import { LogOut, ArrowLeft, CheckCircle2, Circle, Clock, ExternalLink, FileText, Video, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Phase {
  id: string;
  title: string;
  description: string;
  phase_order: number;
}

interface Progress {
  phase_id: string;
  status: string;
  started_at: string | null;
  completed_at: string | null;
}

interface Material {
  id: string;
  phase_id: string;
  title: string;
  description: string;
  url: string | null;
  material_type: string;
  material_order: number;
}

const materialIcons: Record<string, React.ReactNode> = {
  link: <LinkIcon className="w-4 h-4" />,
  video: <Video className="w-4 h-4" />,
  document: <FileText className="w-4 h-4" />,
  other: <ExternalLink className="w-4 h-4" />,
};

const statusConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  pending: { icon: <Circle className="w-5 h-5" />, label: "Pendente", color: "text-muted-foreground" },
  in_progress: { icon: <Clock className="w-5 h-5" />, label: "Em andamento", color: "text-gold" },
  completed: { icon: <CheckCircle2 className="w-5 h-5" />, label: "Concluída", color: "text-green-500" },
};

const MentoriaDashboard = () => {
  const [phases, setPhases] = useState<Phase[]>([]);
  const [progress, setProgress] = useState<Progress[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [menteeName, setMenteeName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuthAndLoad();
  }, []);

  const checkAuthAndLoad = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/mentoria/login");
      return;
    }

    // Check mentee role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id);

    const isAdmin = roles?.some((r) => r.role === "admin");
    if (isAdmin) {
      navigate("/mentoria/admin");
      return;
    }

    const isMentee = roles?.some((r) => r.role === "mentee");
    if (!isMentee) {
      toast({ title: "Acesso negado", variant: "destructive" });
      await supabase.auth.signOut();
      navigate("/mentoria/login");
      return;
    }

    // Load mentee name
    const { data: mentee } = await supabase
      .from("mentees")
      .select("name")
      .eq("user_id", session.user.id)
      .maybeSingle();
    if (mentee) setMenteeName(mentee.name);

    // Load phases, progress, materials
    const [phasesRes, progressRes, materialsRes] = await Promise.all([
      supabase.from("mentoring_phases").select("*").order("phase_order"),
      supabase.from("mentee_progress").select("*"),
      supabase.from("phase_materials").select("*").order("material_order"),
    ]);

    setPhases(phasesRes.data || []);
    setProgress(progressRes.data || []);
    setMaterials(materialsRes.data || []);
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/mentoria/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <p className="text-on-navy/60 font-body">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-navy border-b border-gold/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="Tradupoints" className="h-7" />
            </Link>
            <span className="text-xs text-gold/60 font-body tracking-widest uppercase">Mentoria</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-on-navy/50 hover:text-gold transition-colors font-body hidden sm:inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Site
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-on-navy/60 hover:text-gold">
              <LogOut className="w-4 h-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-3xl">
        <div className="mb-8">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Olá, {menteeName}! 👋
          </h1>
          <p className="font-body text-sm text-muted-foreground mt-1">
            Acompanhe seu progresso na mentoria
          </p>
        </div>

        <div className="space-y-6">
          {phases.map((phase) => {
            const phaseProgress = progress.find((p) => p.phase_id === phase.id);
            const phaseMaterials = materials.filter((m) => m.phase_id === phase.id);
            const status = phaseProgress?.status || "pending";
            const config = statusConfig[status] || statusConfig.pending;

            return (
              <div key={phase.id} className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="px-6 py-5 flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <span className={`mt-0.5 ${config.color}`}>{config.icon}</span>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">{phase.title}</h3>
                      <p className="font-body text-sm text-muted-foreground mt-1">{phase.description}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-body tracking-wide uppercase ${config.color}`}>
                    {config.label}
                  </span>
                </div>

                {phaseMaterials.length > 0 && (
                  <div className="border-t border-border px-6 py-4">
                    <p className="text-xs font-body text-muted-foreground uppercase tracking-wider mb-3">Materiais</p>
                    <div className="space-y-2">
                      {phaseMaterials.map((material) => (
                        <div key={material.id} className="flex items-center gap-3">
                          <span className="text-gold/60">{materialIcons[material.material_type] || materialIcons.other}</span>
                          {material.url ? (
                            <a
                              href={material.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-body text-sm text-foreground hover:text-gold transition-colors"
                            >
                              {material.title}
                            </a>
                          ) : (
                            <span className="font-body text-sm text-foreground">{material.title}</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default MentoriaDashboard;
