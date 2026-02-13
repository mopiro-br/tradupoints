import { motion } from "framer-motion";
import logo from "@/assets/logo-colorida.png";
import { ArrowRight, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlogPosts";

const BlogPodcast = () => {
  const { data: posts } = useBlogPosts();
  const previewPosts = (posts || []).slice(0, 3);

  if (previewPosts.length === 0) return null;

  return (
    <section id="blog" className="py-16 md:py-20 bg-muted/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="flex items-center justify-center gap-2 flex-wrap">
            <span className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight">Blog da</span>
            <img src={logo} alt="Tradupoints" className="h-6 md:h-8 inline-block" />
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
