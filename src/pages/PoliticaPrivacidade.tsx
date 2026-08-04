import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PoliticaPrivacidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-navy border-b border-gold/10">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao site
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 lg:px-12 py-12 max-w-4xl">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
          Política de Privacidade
        </h1>
        <p className="font-body text-sm text-muted-foreground mb-10">
          Última atualização: {new Date().toLocaleDateString("pt-BR")}
        </p>

        <div className="prose-policy space-y-8 font-body text-sm text-foreground/80 leading-relaxed">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              1. Introdução
            </h2>
            <p>
              A <strong>Tradupoints</strong> ("nós", "nosso" ou "empresa"), comprometida com a
              transparência e a proteção dos dados pessoais de seus usuários, clientes e
              parceiros, apresenta esta Política de Privacidade em conformidade com a Lei
              Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018, LGPD) e demais
              normas aplicáveis.
            </p>
            <p>
              Esta política descreve como coletamos, utilizamos, armazenamos e protegemos
              seus dados pessoais ao acessar nosso site e utilizar nossos serviços.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              2. Controlador dos Dados
            </h2>
            <p>
              A Tradupoints é a controladora dos dados pessoais tratados por meio deste
              site, nos termos do art. 5º, VI, da LGPD. Para exercer seus direitos ou
              esclarecer dúvidas, entre em contato pelo e-mail:{" "}
              <a href="mailto:vendas@tradupoints.com.br" className="text-gold underline">
                vendas@tradupoints.com.br
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              3. Dados Pessoais Coletados
            </h2>
            <p>Podemos coletar os seguintes dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Dados de identificação:</strong> nome completo, e-mail e telefone,
                fornecidos voluntariamente por meio do formulário de solicitação de
                orçamento.
              </li>
              <li>
                <strong>Dados do evento:</strong> tipo de evento, data estimada, idiomas
                necessários e número estimado de participantes.
              </li>
              <li>
                <strong>Dados de navegação:</strong> endereço IP, tipo de navegador, páginas
                acessadas, tempo de permanência e cookies, coletados automaticamente durante
                a navegação.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              4. Finalidades do Tratamento
            </h2>
            <p>Os dados pessoais são tratados para as seguintes finalidades:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Responder a solicitações de orçamento e contato;</li>
              <li>Prestar os serviços contratados de tradução e interpretação;</li>
              <li>Enviar comunicações relevantes sobre nossos serviços, quando autorizado;</li>
              <li>Melhorar a experiência de navegação e funcionalidades do site;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              5. Bases Legais para o Tratamento (Art. 7º, LGPD)
            </h2>
            <p>O tratamento dos dados pessoais fundamenta-se nas seguintes bases legais:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                <strong>Consentimento</strong> (art. 7º, I): quando você preenche o
                formulário de contato ou aceita cookies opcionais.
              </li>
              <li>
                <strong>Execução de contrato</strong> (art. 7º, V): para a prestação dos
                serviços de tradução e interpretação contratados.
              </li>
              <li>
                <strong>Legítimo interesse</strong> (art. 7º, IX): para melhorias no site e
                comunicações comerciais pertinentes.
              </li>
              <li>
                <strong>Cumprimento de obrigação legal</strong> (art. 7º, II): para atender
                exigências fiscais, contábeis e regulatórias.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              6. Compartilhamento de Dados
            </h2>
            <p>
              Seus dados pessoais não são vendidos, alugados ou compartilhados com terceiros
              para fins comerciais. O compartilhamento pode ocorrer nas seguintes hipóteses:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>
                Com prestadores de serviços essenciais (hospedagem, e-mail), sob cláusulas
                contratuais de proteção de dados;
              </li>
              <li>Por determinação legal ou ordem judicial;</li>
              <li>Para proteção dos direitos da Tradupoints em processos administrativos ou judiciais.</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              7. Armazenamento e Segurança
            </h2>
            <p>
              Os dados pessoais são armazenados em servidores seguros, com medidas técnicas e
              administrativas adequadas para proteger contra acesso não autorizado,
              destruição, perda, alteração ou qualquer forma de tratamento inadequado, em
              conformidade com o art. 46 da LGPD.
            </p>
            <p>
              Os dados são retidos pelo período necessário para cumprir as finalidades
              descritas nesta política ou conforme exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              8. Cookies
            </h2>
            <p>
              Utilizamos cookies essenciais para o funcionamento do site e cookies analíticos
              para compreender o comportamento de navegação. Você pode gerenciar suas
              preferências de cookies a qualquer momento pelo banner de consentimento exibido
              no site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              9. Direitos do Titular dos Dados (Art. 18, LGPD)
            </h2>
            <p>
              Você, como titular dos dados pessoais, pode exercer a qualquer momento os
              seguintes direitos:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Confirmação da existência de tratamento;</li>
              <li>Acesso aos dados pessoais;</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados;</li>
              <li>
                Anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em
                desconformidade;
              </li>
              <li>Portabilidade dos dados;</li>
              <li>Eliminação dos dados tratados com base no consentimento;</li>
              <li>
                Informação sobre entidades públicas e privadas com as quais houve
                compartilhamento;
              </li>
              <li>Revogação do consentimento.</li>
            </ul>
            <p className="mt-2">
              Para exercer esses direitos, entre em contato pelo e-mail{" "}
              <a href="mailto:vendas@tradupoints.com.br" className="text-gold underline">
                vendas@tradupoints.com.br
              </a>
              . Responderemos no prazo legal de até 15 dias.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              10. Transferência Internacional de Dados
            </h2>
            <p>
              Alguns de nossos prestadores de serviços podem estar localizados fora do
              Brasil. Nesses casos, a transferência internacional de dados será realizada em
              conformidade com os arts. 33 a 36 da LGPD, adotando salvaguardas adequadas
              para garantir a proteção dos seus dados pessoais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              11. Alterações nesta Política
            </h2>
            <p>
              Esta Política de Privacidade pode ser atualizada periodicamente. Quaisquer
              alterações significativas serão comunicadas por meio do nosso site. A data da
              última atualização estará sempre indicada no topo deste documento.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground mb-3">
              12. Contato e Encarregado de Dados (DPO)
            </h2>
            <p>
              Para dúvidas, solicitações ou reclamações relacionadas ao tratamento de dados
              pessoais, entre em contato com nosso encarregado de dados:
            </p>
            <ul className="list-none mt-2 space-y-1">
              <li>
                <strong>E-mail:</strong>{" "}
                <a href="mailto:vendas@tradupoints.com.br" className="text-gold underline">
                  vendas@tradupoints.com.br
                </a>
              </li>
            </ul>
            <p className="mt-2">
              Caso não obtenha resposta satisfatória, você pode apresentar reclamação à
              Autoridade Nacional de Proteção de Dados (ANPD) por meio do site{" "}
              <a
                href="https://www.gov.br/anpd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gold underline"
              >
                www.gov.br/anpd
              </a>
              .
            </p>
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

export default PoliticaPrivacidade;
