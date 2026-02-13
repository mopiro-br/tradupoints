import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-horizontal.png";

const MentoriaSetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
        setSessionReady(true);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({ title: "Erro", description: "As senhas não coincidem.", variant: "destructive" });
      return;
    }

    if (password.length < 6) {
      toast({ title: "Erro", description: "A senha deve ter pelo menos 6 caracteres.", variant: "destructive" });
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Senha definida com sucesso!" });
      navigate("/mentoria");
    }
    setLoading(false);
  };

  if (!sessionReady) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-6">
        <div className="text-center">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <p className="text-muted/60 font-body">Verificando sessão...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <h1 className="font-display text-2xl font-bold text-background">Defina sua Senha</h1>
          <p className="font-body text-sm text-muted/60 mt-2">Crie uma senha para acessar a área de mentoria</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <Label htmlFor="password" className="text-muted/80 font-body text-sm">Nova senha</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} className="mt-1 bg-navy-light border-gold/20 text-background" />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-muted/80 font-body text-sm">Confirmar senha</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required minLength={6} className="mt-1 bg-navy-light border-gold/20 text-background" />
          </div>
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? "Salvando..." : "Definir senha"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default MentoriaSetPassword;
