import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, LogOut, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  read_time: string;
  published: boolean;
  created_at: string;
}

const emptyPost = {
  slug: "",
  title: "",
  excerpt: "",
  content: "",
  category: "Artigo",
  read_time: "5 min",
  published: false,
};

const Admin = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [editing, setEditing] = useState<Partial<BlogPost> | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
    fetchPosts();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate("/admin/login");
      return;
    }
    // Check admin role
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", session.user.id)
      .eq("role", "admin");

    if (!roles || roles.length === 0) {
      toast({ title: "Acesso negado", description: "Você não tem permissão de administrador.", variant: "destructive" });
      await supabase.auth.signOut();
      navigate("/admin/login");
    }
  };

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });
    setPosts(data || []);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    const postData = {
      slug: editing.slug!,
      title: editing.title!,
      excerpt: editing.excerpt!,
      content: editing.content!,
      category: editing.category!,
      read_time: editing.read_time!,
      published: editing.published ?? false,
    };

    let error;
    if (editing.id) {
      ({ error } = await supabase.from("blog_posts").update(postData).eq("id", editing.id));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(postData));
    }

    if (error) {
      toast({ title: "Erro ao salvar", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Salvo com sucesso!" });
      setEditing(null);
      fetchPosts();
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este post?")) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (error) {
      toast({ title: "Erro ao excluir", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post excluído" });
      fetchPosts();
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center">
        <p className="text-muted/60 font-body">Carregando...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="bg-navy border-b border-gold/10 px-6 py-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Tradupoints" className="h-7" />
            <span className="text-xs text-gold/60 font-body tracking-widest uppercase">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-xs text-muted/50 hover:text-gold transition-colors font-body hidden sm:inline-flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Site
            </Link>
            <Link to="/mentoria/admin" className="text-xs text-muted/50 hover:text-gold transition-colors font-body hidden sm:inline-flex items-center gap-1">
              Mentoria
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="text-muted/60 hover:text-gold">
              <LogOut className="w-4 h-4 mr-1" /> Sair
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-10 max-w-4xl">
        {editing ? (
          <div className="space-y-6">
            <button
              onClick={() => setEditing(null)}
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar à lista
            </button>

            <h2 className="font-display text-2xl font-bold text-foreground">
              {editing.id ? "Editar Post" : "Novo Post"}
            </h2>

            <div className="grid gap-5">
              <div>
                <Label className="font-body text-sm">Título</Label>
                <Input value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="mt-1" />
              </div>
              <div>
                <Label className="font-body text-sm">Slug (URL)</Label>
                <Input value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-body text-sm">Categoria</Label>
                  <Input value={editing.category || ""} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="mt-1" />
                </div>
                <div>
                  <Label className="font-body text-sm">Tempo de leitura</Label>
                  <Input value={editing.read_time || ""} onChange={(e) => setEditing({ ...editing, read_time: e.target.value })} className="mt-1" />
                </div>
              </div>
              <div>
                <Label className="font-body text-sm">Resumo</Label>
                <Textarea value={editing.excerpt || ""} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} rows={3} className="mt-1" />
              </div>
              <div>
                <Label className="font-body text-sm">Conteúdo (Markdown)</Label>
                <Textarea value={editing.content || ""} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={16} className="mt-1 font-mono text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={editing.published ?? false}
                  onCheckedChange={(v) => setEditing({ ...editing, published: v })}
                />
                <Label className="font-body text-sm">{editing.published ? "Publicado" : "Rascunho"}</Label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button variant="gold" onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </Button>
              <Button variant="outline" onClick={() => setEditing(null)}>Cancelar</Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl font-bold text-foreground">Posts do Blog</h2>
              <Button variant="gold" size="sm" onClick={() => setEditing({ ...emptyPost })}>
                <Plus className="w-4 h-4 mr-1" /> Novo Post
              </Button>
            </div>

            {posts.length === 0 ? (
              <p className="text-muted-foreground font-body text-center py-12">Nenhum post ainda.</p>
            ) : (
              <div className="space-y-3">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-5 py-4">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display font-semibold text-foreground truncate">{post.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-xs text-gold font-body tracking-wide uppercase">{post.category}</span>
                        <span className={`text-xs font-body ${post.published ? "text-green-600" : "text-muted-foreground"}`}>
                          {post.published ? "Publicado" : "Rascunho"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="icon" onClick={() => setEditing(post)}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)} className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
};

export default Admin;
