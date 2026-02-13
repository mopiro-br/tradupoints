import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Podcast } from "lucide-react";

const blogPosts = [
  {
    title: "Bastidores de um congresso médico internacional",
    excerpt:
      "Como a preparação meticulosa — estudo de artigos, glossários técnicos e simulações — garante interpretação impecável em eventos de alta complexidade.",
    category: "Expertise",
  },
  {
    title: "Tecnologia BYOD: o futuro da tradução simultânea",
    excerpt:
      "Conheça o sistema que substitui receptores tradicionais com discrição, sustentabilidade e modernidade — sem filas constrangedoras.",
    category: "Inovação",
  },
  {
    title: "Contextualização técnica: além da tradução literal",
    excerpt:
      "Por que dominar a terminologia médica e científica é apenas o começo. A verdadeira expertise está na contextualização estratégica.",
    category: "Conhecimento",
  },
];

const podcastEpisodes = [
  {
    title: "Quando Cada Palavra Importa",
    description: "Os desafios de interpretar terminologia oncológica em congressos internacionais com centenas de participantes.",
    episode: "Ep. 12",
  },
  {
    title: "Parceria Estratégica em Eventos",
    description: "Como a preparação meticulosa transforma a experiência de palestrantes e participantes em eventos científicos.",
    episode: "Ep. 11",
  },
];

const BlogPodcast = () => {
  return (
    <section id="blog" className="section-padding bg-muted/30">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-sm tracking-[0.3em] uppercase mb-3">
            Conteúdo
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Insights & Conhecimento
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-gold/30 hover:shadow-lg transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-gold" />
                <span className="text-xs font-body text-gold tracking-widest uppercase">
                  {post.category}
                </span>
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                {post.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-4">
                {post.excerpt}
              </p>
              <span className="inline-flex items-center gap-1 text-sm text-gold font-body">
                Ler mais <ArrowRight className="w-3 h-3" />
              </span>
            </motion.article>
          ))}
        </div>

        {/* Podcast */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-navy rounded-xl p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Podcast className="w-6 h-6 text-gold" />
            <h3 className="font-display text-2xl font-bold text-background">
              Podcast Tradupoints
            </h3>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {podcastEpisodes.map((ep) => (
              <div
                key={ep.title}
                className="border border-gold/20 rounded-lg p-6 hover:border-gold/40 transition-colors cursor-pointer"
              >
                <span className="text-xs text-gold font-body tracking-widest uppercase">
                  {ep.episode}
                </span>
                <h4 className="font-display text-lg font-semibold text-background mt-2 mb-2">
                  {ep.title}
                </h4>
                <p className="font-body text-sm text-muted/60">
                  {ep.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPodcast;
