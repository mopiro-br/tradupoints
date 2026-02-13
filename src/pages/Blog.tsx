import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo-colorida.png";
import blogPosts from "@/data/blogPosts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ContactFormDialog from "@/components/ContactFormDialog";

const Blog = () => {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background">
      <Navbar onRequestQuote={() => setContactOpen(true)} />

      <section className="pt-28 pb-20 px-6 lg:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-red-accent transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao início
            </Link>
            <h1 className="flex items-center gap-2 flex-wrap">
              <span className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">Blog da</span>
              <img src={logo} alt="Tradupoints" className="h-7 md:h-9 inline-block" />
            </h1>
            <p className="font-body text-muted-foreground mt-4 max-w-2xl">
              Artigos sobre tradução simultânea, eventos médicos e científicos,
              tecnologia e o universo da interpretação profissional.
            </p>
          </motion.div>

          <div className="flex flex-col gap-8">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link to={`/blog/${post.slug}`}>
                  <div className="bg-card border border-border rounded-xl p-8 hover:border-red-accent/30 hover:shadow-lg hover:shadow-red-accent/5 transition-all duration-300 group">
                    <div className="flex items-center gap-4 mb-4">
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
                    <h2 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-3 group-hover:text-red-accent transition-colors">
                      {post.title}
                    </h2>
                    <p className="font-body text-muted-foreground leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1 text-sm text-gold font-body group-hover:text-red-accent group-hover:gap-2 transition-all">
                      Ler artigo completo <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
      <ContactFormDialog open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Blog;
