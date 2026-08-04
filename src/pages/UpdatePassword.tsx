import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-horizontal.png";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionReady, setSessionReady] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Listen for the PASSWORD_RECOVERY event from the magic link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        setSessionReady(true);
      }
    });

    // Also check if we already have a session (user clicked link and session is active)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Erro",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast({
        title: "Erro ao atualizar senha",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Senha atualizada com sucesso!" });
      navigate("/admin");
    }

    setLoading(false);
  };

  if (!sessionReady) {
    return (
      <main className="min-h-screen bg-navy flex items-center justify-center px-6">
        <div className="text-center">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <p className="text-on-navy/60 font-body">Verificando sessão...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <h1 className="font-display text-2xl font-bold text-on-navy">Nova Senha</h1>
          <p className="font-body text-sm text-on-navy/60 mt-2">Digite sua nova senha abaixo</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <Label htmlFor="password" className="text-on-navy/80 font-body text-sm">Nova senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 bg-navy-light border-gold/20 text-on-navy"
            />
          </div>
          <div>
            <Label htmlFor="confirmPassword" className="text-on-navy/80 font-body text-sm">Confirmar nova senha</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1 bg-navy-light border-gold/20 text-on-navy"
            />
          </div>
          <Button type="submit" variant="gold" className="w-full" disabled={loading}>
            {loading ? "Atualizando..." : "Atualizar senha"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default UpdatePassword;
