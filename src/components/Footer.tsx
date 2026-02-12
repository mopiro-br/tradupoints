import logoHorizontal from "@/assets/logo-horizontal.png";

const Footer = () => {
  return (
    <footer className="bg-navy-dark border-t border-gold/10">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <img src={logoHorizontal} alt="Tradupoints" className="h-7 mb-4" />
            <p className="font-body text-sm text-muted/50 leading-relaxed">
              Parceira estratégica em tradução simultânea para eventos médicos,
              científicos e técnicos de alta complexidade.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">
              Serviços
            </h4>
            <ul className="space-y-2">
              {[
                "Tradução Simultânea",
                "Tradução Escrita",
                "Transcrição",
                "Tecnologia BYOD",
                "Sonorização & DJ",
                "Mentoria para Intérpretes",
              ].map((s) => (
                <li key={s}>
                  <a
                    href="#servicos"
                    className="font-body text-sm text-muted/50 hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Content */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">
              Conteúdo
            </h4>
            <ul className="space-y-2">
              {["Blog", "Podcast"].map((s) => (
                <li key={s}>
                  <a
                    href="#blog"
                    className="font-body text-sm text-muted/50 hover:text-gold transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-display text-sm font-semibold text-background mb-4">
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Política de Privacidade (LGPD)", href: "#lgpd" },
                { label: "Termos de Uso", href: "#lgpd" },
                { label: "Política de Cookies", href: "#lgpd" },
              ].map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-body text-sm text-muted/50 hover:text-gold transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gold/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-xs text-muted/40">
            © {new Date().getFullYear()} Tradupoints. Todos os direitos
            reservados. CNPJ: XX.XXX.XXX/0001-XX
          </p>
          <p className="font-body text-xs text-muted/40">
            Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
