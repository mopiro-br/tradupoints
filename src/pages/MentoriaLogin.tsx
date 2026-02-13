import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-horizontal.png";
import { ArrowLeft } from "lucide-react";

const MentoriaLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: "Erro ao entrar",
        description: error.message,
        variant: "destructive",
      });
    } else {
      // Check role to redirect appropriately
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: roles } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id);

        const isAdmin = roles?.some((r) => r.role === "admin");
        const isMentee = roles?.some((r) => r.role === "mentee");

        if (isAdmin) {
          window.location.href = "/mentoria/admin";
        } else if (isMentee) {
          window.location.href = "/mentoria";
        } else {
          toast({ title: "Acesso negado", description: "Você não tem acesso à área de mentoria.", variant: "destructive" });
          await supabase.auth.signOut();
        }
      }
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <h1 className="font-display text-2xl font-bold text-background">Área do Mentorado</h1>
          <p className="font-body text-sm text-muted/60 mt-2">Faça login para acessar sua mentoria</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-muted/80 font-body text-sm">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-navy-light border-gold/20 text-background"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-muted/80 font-body text-sm">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-navy-light border-gold/20 text-background"
            />
          </div>
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center space-y-2">
            <Link
              to="/admin/reset-password"
              className="block font-body text-xs text-muted/40 hover:text-gold transition-colors"
            >
              Esqueci minha senha
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-muted/50 hover:text-gold transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao site
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default MentoriaLogin;
