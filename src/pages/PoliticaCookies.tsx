import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PoliticaCookies = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy border-b border-gold/10">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gold hover:text-red-accent transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Política de Cookies
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-10">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="space-y-8 font-body text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              1. O que são Cookies?
            </h2>
            <p>
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo (computador,
              tablet ou smartphone) quando você visita um site. Eles permitem que o site reconheça
              seu dispositivo e armazene informações sobre suas preferências e interações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              2. Tipos de Cookies que Utilizamos
            </h2>

            <div className="space-y-4 mt-4">
              <div className="border border-border rounded-lg p-4">
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  🔒 Cookies Essenciais
                </h3>
                <p>
                  São necessários para o funcionamento básico do site. Sem eles, funcionalidades
                  como navegação entre páginas e acesso a áreas seguras não funcionariam corretamente.
                  Estes cookies não coletam informações pessoais e não podem ser desativados.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>Preferências de consentimento de cookies</li>
                  <li>Sessão de navegação</li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  📊 Cookies Analíticos
                </h3>
                <p>
                  Nos ajudam a entender como os visitantes interagem com o site, coletando
                  informações de forma anônima e agregada. Utilizamos esses dados para melhorar
                  continuamente a experiência do usuário.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    <strong>Google Analytics 4</strong> — mede o tráfego do site, páginas mais
                    visitadas e comportamento de navegação
                  </li>
                  <li>
                    <strong>Google Tag Manager</strong> — gerencia de forma centralizada os scripts
                    e tags do site
                  </li>
                </ul>
              </div>

              <div className="border border-border rounded-lg p-4">
                <h3 className="font-display text-base font-semibold text-foreground mb-2">
                  📣 Cookies de Marketing
                </h3>
                <p>
                  Utilizados para rastrear visitantes em diferentes sites e exibir anúncios
                  relevantes. Esses cookies são fornecidos por terceiros e nos permitem medir a
                  eficácia de nossas campanhas publicitárias.
                </p>
                <ul className="list-disc pl-6 space-y-1 mt-2">
                  <li>
                    <strong>Meta Pixel (Facebook)</strong> — rastreia conversões e permite
                    remarketing em plataformas Meta
                  </li>
                  <li>
                    <strong>LinkedIn Insight Tag</strong> — mede conversões e permite segmentação
                    de público profissional
                  </li>
                  <li>
                    <strong>Google AdSense</strong> — exibe anúncios relevantes com base no perfil
                    de navegação
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              3. Como Gerenciar seus Cookies
            </h2>
            <p>
              No seu primeiro acesso ao site, apresentamos um banner de consentimento onde você pode
              aceitar ou rejeitar cookies opcionais (analíticos e de marketing). Cookies essenciais
              permanecerão ativos independentemente da sua escolha.
            </p>
            <p className="mt-2">
              Você também pode gerenciar cookies diretamente nas configurações do seu navegador:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Google Chrome:</strong> Configurações → Privacidade e segurança → Cookies
              </li>
              <li>
                <strong>Firefox:</strong> Configurações → Privacidade e Segurança → Cookies
              </li>
              <li>
                <strong>Safari:</strong> Preferências → Privacidade → Cookies
              </li>
              <li>
                <strong>Edge:</strong> Configurações → Cookies e permissões do site
              </li>
            </ul>
            <p className="mt-2 text-muted-foreground">
              Observação: desativar cookies pode afetar a funcionalidade de alguns recursos do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              4. Tempo de Armazenamento
            </h2>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Cookies de sessão:</strong> são apagados automaticamente ao fechar o
                navegador.
              </li>
              <li>
                <strong>Cookies persistentes:</strong> permanecem no dispositivo por um período
                definido (geralmente entre 30 dias e 2 anos), conforme a finalidade.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              5. Base Legal
            </h2>
            <p>
              O uso de cookies essenciais está fundamentado no legítimo interesse da Tradupoints para
              garantir o funcionamento adequado do site (art. 7º, IX, LGPD). Os cookies analíticos e
              de marketing são utilizados com base no seu consentimento (art. 7º, I, LGPD), obtido
              por meio do banner de consentimento exibido no primeiro acesso.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              6. Alterações nesta Política
            </h2>
            <p>
              Esta Política de Cookies pode ser atualizada periodicamente para refletir mudanças nos
              cookies utilizados ou na legislação aplicável. A data da última atualização estará
              sempre indicada no topo deste documento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              7. Contato
            </h2>
            <p>
              Para dúvidas sobre esta Política de Cookies ou sobre o tratamento dos seus dados
              pessoais, entre em contato:
            </p>
            <ul className="list-none mt-2 space-y-1">
              <li>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:vendas@tradupoints.com.br" className="text-gold underline hover:text-red-accent transition-colors">
                  vendas@tradupoints.com.br
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <footer className="bg-navy-dark border-t border-gold/10 py-6">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <p className="font-body text-xs text-muted-foreground/40">
            © {new Date().getFullYear()} Tradupoints. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PoliticaCookies;
