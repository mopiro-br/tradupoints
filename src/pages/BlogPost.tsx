import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactOpen, setContactOpen] = useState(false);
  const { data: post, isLoading, isError } = useBlogPost(slug);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground font-body">Carregando...</p>
      </main>
    );
  }

  if (isError || !post) return <Navigate to="/blog" replace />;

  const renderContent = (content: string) => {
    return content.split("\n\n").map((block, i) => {
      if (block.startsWith("## ")) {
        return (
          <h2 key={i} className="font-display text-xl md:text-2xl font-bold text-foreground mt-10 mb-4">
            {block.replace("## ", "")}
          </h2>
        );
      }
      if (block.startsWith("- ")) {
        const items = block.split("\n").filter((l) => l.startsWith("- "));
        return (
          <ul key={i} className="list-disc list-inside space-y-2 font-body text-muted-foreground leading-relaxed my-4">
            {items.map((item, j) => {
              const text = item.replace("- ", "");
              const boldMatch = text.match(/^\*\*(.+?)\*\*:?\s*(.*)/);
              if (boldMatch) {
                return (
                  <li key={j}>
                    <strong className="text-foreground">{boldMatch[1]}</strong>
                    {boldMatch[2] ? `: ${boldMatch[2]}` : ""}
                  </li>
                );
              }
              return <li key={j}>{text}</li>;
            })}
          </ul>
        );
      }
      return (
        <p key={i} className="font-body text-muted-foreground leading-relaxed my-4">
          {block}
        </p>
      );
    });
  };

  const canonical = `https://tradupoints.com.br/blog/${post.slug}`;

  return (
    <main className="min-h-screen bg-background">
      <Helmet>
        <title>{`${post.title} — Blog Tradupoints`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Tradupoints" />
        <meta property="og:locale" content="pt_BR" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={canonical} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            inLanguage: "pt-BR",
            datePublished: post.created_at,
            dateModified: post.updated_at,
            mainEntityOfPage: canonical,
            author: { "@type": "Organization", name: "Tradupoints" },
            publisher: { "@type": "Organization", name: "Tradupoints" },
          })}
        </script>
      </Helmet>
      <Navbar onRequestQuote={() => setContactOpen(true)} />


      <article className="pt-28 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-red-accent transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao blog
            </Link>

            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs font-body text-gold tracking-widest uppercase">
                <BookOpen className="w-3.5 h-3.5" />
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground font-body">
                {new Date(post.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-body">
                <Clock className="w-3 h-3" />
                {post.read_time}
              </span>
            </div>

            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight">
              {post.title}
            </h1>

            <div className="border-t border-gold/20 pt-8">
              {renderContent(post.content)}
            </div>
          </motion.div>
        </div>
      </article>

      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default BlogPostPage;
