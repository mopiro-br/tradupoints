import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";
import blogPosts from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [contactOpen, setContactOpen] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/blog" replace />;

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

  return (
    <main className="min-h-screen bg-background">
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
                {new Date(post.date).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-body">
                <Clock className="w-3 h-3" />
                {post.readTime}
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

export default BlogPost;
