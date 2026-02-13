import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo-horizontal.png";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { toast } = useToast();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/update-password`,
    });

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setSent(true);
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <img src={logo} alt="Tradupoints" className="h-8 mx-auto mb-8" />
          <h1 className="font-display text-2xl font-bold text-background">Redefinir Senha</h1>
          <p className="font-body text-sm text-muted/60 mt-2">
            {sent
              ? "Verifique seu e-mail para o link de redefinição"
              : "Informe seu e-mail para receber o link de redefinição"}
          </p>
        </div>

        {sent ? (
          <div className="text-center space-y-6">
            <p className="font-body text-sm text-muted/50">
              Enviamos um link para <strong className="text-gold">{email}</strong>.
              Verifique sua caixa de entrada e spam.
            </p>
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1 text-sm text-gold hover:text-gold/80 transition-colors font-body"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-5">
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
            <Button type="submit" variant="gold" className="w-full" disabled={loading}>
              {loading ? "Enviando..." : "Enviar link de redefinição"}
            </Button>
            <div className="text-center">
              <Link
                to="/admin/login"
                className="inline-flex items-center gap-1 text-sm text-muted/50 hover:text-gold transition-colors font-body"
              >
                <ArrowLeft className="w-4 h-4" /> Voltar ao login
              </Link>
            </div>
          </form>
        )}
      </div>
    </main>
  );
};

export default ResetPassword;
