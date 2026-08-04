import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SITE = "https://tradupoints.com.br";

type Meta = {
  title: string;
  description: string;
  noindex?: boolean;
};

const routes: Record<string, Meta> = {
  "/": {
    title: "Tradupoints | Tradução simultânea para eventos médicos e técnicos",
    description:
      "Tradução simultânea, legendas automáticas e transcrição em tempo real para eventos médicos, científicos e corporativos. Parceira estratégica de agências e empresas.",
  },
  "/quem-somos": {
    title: "Quem somos | Tradupoints",
    description:
      "Conheça a Tradupoints: experiência em interpretação simultânea e soluções de comunicação multilíngue para eventos de alta complexidade.",
  },
  "/servicos": {
    title: "Serviços de tradução e interpretação | Tradupoints",
    description:
      "Interpretação simultânea e consecutiva, tradução simultânea por IA, legendas automáticas, closed caption em tela e transcrição em tempo real.",
  },
  "/depoimentos": {
    title: "Depoimentos de clientes | Tradupoints",
    description:
      "Relatos de agências, empresas e organizadores de eventos sobre a atuação da Tradupoints em interpretação e comunicação multilíngue.",
  },
  "/contato": {
    title: "Contato e proposta | Tradupoints",
    description:
      "Fale com a Tradupoints e solicite uma proposta para tradução simultânea, legendagem automática ou transcrição do seu evento.",
  },
  "/cursos": {
    title: "Cursos para intérpretes | Tradupoints",
    description:
      "Aprimoramento profissional para intérpretes: rotinas com IA, escritório inteligente e interfaces customizáveis criadas para a prática da interpretação.",
  },
  "/blog": {
    title: "Blog sobre interpretação e tradução | Tradupoints",
    description:
      "Artigos sobre interpretação simultânea, tecnologia de legendagem, IA aplicada a eventos e boas práticas do mercado de tradução.",
  },
  "/politica-de-privacidade": {
    title: "Política de Privacidade | Tradupoints",
    description: "Como a Tradupoints trata dados pessoais em conformidade com a LGPD.",
  },
  "/politica-de-cookies": {
    title: "Política de Cookies | Tradupoints",
    description: "Como a Tradupoints utiliza cookies e tecnologias de medição no site.",
  },
};

const PRIVATE_PREFIXES = ["/admin", "/mentoria", "/style-guide"];

const RouteSeo = () => {
  const { pathname } = useLocation();
  const path = pathname !== "/" && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;

  // Pages that own their own Helmet (blog posts) or are private.
  if (path.startsWith("/blog/")) return null;

  const isPrivate = PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
  const meta = routes[path];

  if (isPrivate || !meta) {
    return (
      <Helmet>
        <title>{isPrivate ? "Área restrita | Tradupoints" : "Página não encontrada | Tradupoints"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
    );
  }

  const url = `${SITE}${path === "/" ? "/" : path}`;

  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Tradupoints" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
    </Helmet>
  );
};

export default RouteSeo;
