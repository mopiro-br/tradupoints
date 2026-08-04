import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Pencil, Trash2, LogOut, ArrowLeft, Users, Layers, FileText,
  UserPlus, ChevronDown, ChevronUp, ExternalLink, CheckCircle2, Circle, Clock,
} from "lucide-react";
import logo from "@/assets/logo-horizontal.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Tab = "mentees" | "phases" | "materials";

interface Mentee {
  id: string;
  user_id: string;
  name: string;
  email: string;
  active: boolean;
  created_at: string;
}

interface Phase {
  id: string;
  title: string;
  description: string;
  phase_order: number;
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

interface MenteeProgress {
  id: string;
  mentee_id: string;
  phase_id: string;
  status: string;
}

const MentoriaAdmin = () => {
  const [tab, setTab] = useState<Tab>("mentees");
  const [mentees, setMentees] = useState<Mentee[]>([]);
  const [phases, setPhases] = useState<Phase[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [allProgress, setAllProgress] = useState<MenteeProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteName, setInviteName] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviting, setInviting] = useState(false);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [editingPhase, setEditingPhase] = useState<Partial<Phase> | null>(null);
  const [savingPhase, setSavingPhase] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<Partial<Material> | null>(null);
  const [savingMaterial, setSavingMaterial] = useState(false);
  const [expandedMentee, setExpandedMentee] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    loadData();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/mentoria/login"); return; }

    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      toast({ title: "Acesso negado", variant: "destructive" });
      navigate("/mentoria/login");
    }
  };

  const loadData = async () => {
    const [menteesRes, phasesRes, materialsRes, progressRes] = await Promise.all([
      supabase.from("mentees").select("*").order("created_at", { ascending: false }),
      supabase.from("mentoring_phases").select("*").order("phase_order"),
      supabase.from("phase_materials").select("*").order("material_order"),
      supabase.from("mentee_progress").select("*"),
    ]);
    setMentees(menteesRes.data || []);
    setPhases(phasesRes.data || []);
    setMaterials(materialsRes.data || []);
    setAllProgress(progressRes.data || []);
    setLoading(false);
  };

  const handleInvite = async () => {
    if (!inviteName.trim() || !inviteEmail.trim()) return;
    setInviting(true);

    const { data: { session } } = await supabase.auth.getSession();
    const res = await fetch(
      `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/invite-mentee`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.access_token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ name: inviteName, email: inviteEmail }),
      }
    );

    const result = await res.json();
    if (result.error) {
      toast({ title: "Erro ao convidar", description: result.error, variant: "destructive" });
    } else {
      toast({ title: "Mentorado convidado!", description: `Convite enviado para ${inviteEmail}` });
      setInviteName("");
      setInviteEmail("");
      setShowInviteForm(false);
      loadData();
    }
    setInviting(false);
  };

  const handleUpdateProgress = async (menteeId: string, phaseId: string, newStatus: string) => {
    const existing = allProgress.find((p) => p.mentee_id === menteeId && p.phase_id === phaseId);
    if (!existing) return;

    const updates: Record<string, unknown> = { status: newStatus };
    if (newStatus === "in_progress") updates.started_at = new Date().toISOString();
    if (newStatus === "completed") updates.completed_at = new Date().toISOString();

    const { error } = await supabase.from("mentee_progress").update(updates).eq("id", existing.id);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      loadData();
    }
  };

  const handleSavePhase = async () => {
    if (!editingPhase) return;
    setSavingPhase(true);

    if (editingPhase.id) {
      const { error } = await supabase.from("mentoring_phases")
        .update({ title: editingPhase.title, description: editingPhase.description, phase_order: editingPhase.phase_order })
        .eq("id", editingPhase.id);
      if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      const { error } = await supabase.from("mentoring_phases")
        .insert({ title: editingPhase.title!, description: editingPhase.description || "", phase_order: editingPhase.phase_order || 1 });
      if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    }

    setEditingPhase(null);
    setSavingPhase(false);
    loadData();
  };

  const handleDeletePhase = async (id: string) => {
    if (!confirm("Excluir esta fase?")) return;
    await supabase.from("mentoring_phases").delete().eq("id", id);
    loadData();
  };

  const handleSaveMaterial = async () => {
    if (!editingMaterial) return;
    setSavingMaterial(true);

    if (editingMaterial.id) {
      const { error } = await supabase.from("phase_materials")
        .update({
          title: editingMaterial.title,
          description: editingMaterial.description,
          url: editingMaterial.url,
          material_type: editingMaterial.material_type,
          material_order: editingMaterial.material_order,
          phase_id: editingMaterial.phase_id,
        })
        .eq("id", editingMaterial.id);
      if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      const { error } = await supabase.from("phase_materials").insert({
        phase_id: editingMaterial.phase_id!,
        title: editingMaterial.title!,
        description: editingMaterial.description || "",
        url: editingMaterial.url || null,
        material_type: editingMaterial.material_type || "link",
        material_order: editingMaterial.material_order || 1,
      });
      if (error) toast({ title: "Erro", description: error.message, variant: "destructive" });
    }

    setEditingMaterial(null);
    setSavingMaterial(false);
    loadData();
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Excluir este material?")) return;
    await supabase.from("phase_materials").delete().eq("id", id);
    loadData();
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

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Circle className="w-4 h-4 text-muted-foreground" />,
    in_progress: <Clock className="w-4 h-4 text-gold" />,
    completed: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  };

  const tabs = [
    { key: "mentees" as Tab, label: "Mentorados", icon: <Users className="w-4 h-4" /> },
    { key: "phases" as Tab, label: "Fases", icon: <Layers className="w-4 h-4" /> },
    { key: "materials" as Tab, label: "Materiais", icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-navy border-b border-gold/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <img src={logo} alt="Tradupoints" className="h-7" />
            </Link>
            <span className="text-xs text-gold/60 font-body tracking-widest uppercase">Mentoria Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-on-navy/50 hover:text-gold transition-colors font-body hidden sm:inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Site
            </Link>
            <Link to="/admin" className="text-xs text-on-navy/50 hover:text-gold transition-colors font-body hidden sm:inline-flex items-center gap-1">
              Blog Admin
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-on-navy/60 hover:text-gold">
              <LogOut className="w-4 h-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {/* Tabs */}
        <div className="flex gap-1 mb-8 bg-muted/10 rounded-lg p-1 w-fit">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-body transition-colors ${
                tab === t.key ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* MENTEES TAB */}
        {tab === "mentees" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Mentorados</h2>
              <Button variant="gold" size="sm" onClick={() => setShowInviteForm(!showInviteForm)}>
                <UserPlus className="w-4 h-4 mr-1" /> Convidar
              </Button>
            </div>

            {showInviteForm && (
              <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
                <h3 className="font-display font-semibold text-foreground">Convidar Mentorado</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="font-body text-sm">Nome</Label>
                    <Input value={inviteName} onChange={(e) => setInviteName(e.target.value)} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">E-mail</Label>
                    <Input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} className="mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="gold" size="sm" onClick={handleInvite} disabled={inviting}>
                    {inviting ? "Enviando..." : "Enviar convite"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowInviteForm(false)}>Cancelar</Button>
                </div>
              </div>
            )}

            {mentees.length === 0 ? (
              <p className="text-muted-foreground font-body text-center py-12">Nenhum mentorado ainda.</p>
            ) : (
              <div className="space-y-3">
                {mentees.map((mentee) => {
                  const menteeProgresses = allProgress.filter((p) => p.mentee_id === mentee.id);
                  const isExpanded = expandedMentee === mentee.id;

                  return (
                    <div key={mentee.id} className="bg-card border border-border rounded-lg overflow-hidden">
                      <div
                        className="flex items-center justify-between px-5 py-4 cursor-pointer"
                        onClick={() => setExpandedMentee(isExpanded ? null : mentee.id)}
                      >
                        <div>
                          <h3 className="font-display font-semibold text-foreground">{mentee.name}</h3>
                          <p className="text-xs text-muted-foreground font-body">{mentee.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex gap-1">
                            {menteeProgresses.map((p) => (
                              <span key={p.id}>{statusIcons[p.status]}</span>
                            ))}
                          </div>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                        </div>
                      </div>

                      {isExpanded && (
                        <div className="border-t border-border px-5 py-4 space-y-3">
                          {phases.map((phase) => {
                            const prog = menteeProgresses.find((p) => p.phase_id === phase.id);
                            return (
                              <div key={phase.id} className="flex items-center justify-between">
                                <span className="font-body text-sm text-foreground">{phase.title}</span>
                                <Select
                                  value={prog?.status || "pending"}
                                  onValueChange={(v) => handleUpdateProgress(mentee.id, phase.id, v)}
                                >
                                  <SelectTrigger className="w-40 h-8 text-xs">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="pending">Pendente</SelectItem>
                                    <SelectItem value="in_progress">Em andamento</SelectItem>
                                    <SelectItem value="completed">Concluída</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* PHASES TAB */}
        {tab === "phases" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Fases da Mentoria</h2>
              <Button variant="gold" size="sm" onClick={() => setEditingPhase({ title: "", description: "", phase_order: phases.length + 1 })}>
                <Plus className="w-4 h-4 mr-1" /> Nova Fase
              </Button>
            </div>

            {editingPhase && (
              <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label className="font-body text-sm">Título</Label>
                    <Input value={editingPhase.title || ""} onChange={(e) => setEditingPhase({ ...editingPhase, title: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Descrição</Label>
                    <Textarea value={editingPhase.description || ""} onChange={(e) => setEditingPhase({ ...editingPhase, description: e.target.value })} rows={3} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">Ordem</Label>
                    <Input type="number" value={editingPhase.phase_order || 1} onChange={(e) => setEditingPhase({ ...editingPhase, phase_order: parseInt(e.target.value) })} className="mt-1 w-24" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="gold" size="sm" onClick={handleSavePhase} disabled={savingPhase}>
                    {savingPhase ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingPhase(null)}>Cancelar</Button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              {phases.map((phase) => (
                <div key={phase.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4">
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{phase.title}</h3>
                    <p className="text-xs text-muted-foreground font-body mt-1">{phase.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground font-body">#{phase.phase_order}</span>
                    <Button variant="ghost" size="icon" onClick={() => setEditingPhase(phase)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeletePhase(phase.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MATERIALS TAB */}
        {tab === "materials" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-bold text-foreground">Materiais</h2>
              <Button
                variant="gold"
                size="sm"
                onClick={() => setEditingMaterial({ phase_id: phases[0]?.id || "", title: "", description: "", url: "", material_type: "link", material_order: 1 })}
                disabled={phases.length === 0}
              >
                <Plus className="w-4 h-4 mr-1" /> Novo Material
              </Button>
            </div>

            {editingMaterial && (
              <div className="bg-card border border-border rounded-lg p-5 mb-6 space-y-4">
                <div className="grid gap-4">
                  <div>
                    <Label className="font-body text-sm">Fase</Label>
                    <Select value={editingMaterial.phase_id || ""} onValueChange={(v) => setEditingMaterial({ ...editingMaterial, phase_id: v })}>
                      <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {phases.map((p) => (
                          <SelectItem key={p.id} value={p.id}>{p.title}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="font-body text-sm">Título</Label>
                    <Input value={editingMaterial.title || ""} onChange={(e) => setEditingMaterial({ ...editingMaterial, title: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label className="font-body text-sm">URL</Label>
                    <Input value={editingMaterial.url || ""} onChange={(e) => setEditingMaterial({ ...editingMaterial, url: e.target.value })} className="mt-1" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-sm">Tipo</Label>
                      <Select value={editingMaterial.material_type || "link"} onValueChange={(v) => setEditingMaterial({ ...editingMaterial, material_type: v })}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="link">Link</SelectItem>
                          <SelectItem value="video">Vídeo</SelectItem>
                          <SelectItem value="document">Documento</SelectItem>
                          <SelectItem value="other">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="font-body text-sm">Ordem</Label>
                      <Input type="number" value={editingMaterial.material_order || 1} onChange={(e) => setEditingMaterial({ ...editingMaterial, material_order: parseInt(e.target.value) })} className="mt-1" />
                    </div>
                  </div>
                  <div>
                    <Label className="font-body text-sm">Descrição</Label>
                    <Textarea value={editingMaterial.description || ""} onChange={(e) => setEditingMaterial({ ...editingMaterial, description: e.target.value })} rows={2} className="mt-1" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="gold" size="sm" onClick={handleSaveMaterial} disabled={savingMaterial}>
                    {savingMaterial ? "Salvando..." : "Salvar"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setEditingMaterial(null)}>Cancelar</Button>
                </div>
              </div>
            )}

            {phases.map((phase) => {
              const phaseMats = materials.filter((m) => m.phase_id === phase.id);
              if (phaseMats.length === 0) return null;
              return (
                <div key={phase.id} className="mb-6">
                  <h3 className="font-display font-semibold text-foreground mb-3">{phase.title}</h3>
                  <div className="space-y-2">
                    {phaseMats.map((mat) => (
                      <div key={mat.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-gold/60">
                            {mat.material_type === "video" ? <ExternalLink className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                          </span>
                          <div>
                            <p className="font-body text-sm text-foreground">{mat.title}</p>
                            {mat.url && <p className="text-xs text-muted-foreground truncate max-w-xs">{mat.url}</p>}
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => setEditingMaterial(mat)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteMaterial(mat.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}

            {materials.length === 0 && (
              <p className="text-muted-foreground font-body text-center py-12">Nenhum material ainda.</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default MentoriaAdmin;
