import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import blogPosts from "@/data/blogPosts";

const BlogPodcast = () => {
  const previewPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-red-accent font-body text-sm tracking-[0.3em] uppercase mb-3">
            Conteúdo
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Insights & Conhecimento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {previewPosts.map((post, i) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link to={`/blog/${post.slug}`}>
                <div className="bg-card border border-border rounded-xl p-8 hover:border-red-accent/30 hover:shadow-lg hover:shadow-red-accent/5 transition-all duration-300 cursor-pointer group h-full">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="w-4 h-4 text-gold" />
                    <span className="text-xs font-body text-gold tracking-widest uppercase">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-red-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-gold font-body group-hover:text-red-accent transition-colors">
                    Ler mais <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gold font-body font-medium hover:text-red-accent hover:gap-3 transition-all duration-300"
          >
            Ver todos os artigos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPodcast;
