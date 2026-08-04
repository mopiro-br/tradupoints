import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/logo-horizontal.png";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const trimmedEmail = email.trim();
    if (!trimmedEmail || trimmedEmail.length > 255) {
      toast({ title: "E-mail inválido", variant: "destructive" });
      return;
    }
    if (!password || password.length > 128) {
      toast({ title: "Senha inválida", variant: "destructive" });
      return;
    }
    
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });

    if (error) {
      toast({
        title: "Erro ao entrar",
        description: "Credenciais inválidas.",
        variant: "destructive",
      });
    } else {
      navigate("/admin");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <h1 className="font-display text-2xl font-bold text-on-navy">Painel Administrativo</h1>
          <p className="font-body text-sm text-on-navy/60 mt-2">Faça login para gerenciar o blog</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <Label htmlFor="email" className="text-on-navy/80 font-body text-sm">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 bg-navy-light border-gold/20 text-on-navy"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-on-navy/80 font-body text-sm">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 bg-navy-light border-gold/20 text-on-navy"
            />
          </div>
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </Button>
          <div className="text-center space-y-2">
            <Link
              to="/admin/reset-password"
              className="block font-body text-xs text-on-navy/40 hover:text-gold transition-colors"
            >
              Esqueci minha senha
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-sm text-on-navy/50 hover:text-gold transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao site
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
