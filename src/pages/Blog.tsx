import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DarkHero from "@/components/DarkHero";

const posts = [
  { title: "The Complete Guide to SEO in 2026", excerpt: "Everything you need to know about ranking in today's search landscape, from technical SEO to AI-driven content strategies.", category: "SEO", slug: "#" },
  { title: "How to Maximize Your ROAS with Meta Ads", excerpt: "A data-driven approach to building high-performing Meta advertising campaigns that scale profitably.", category: "Paid Media", slug: "#" },
  { title: "Why Most Marketing Funnels Fail (And How to Fix Yours)", excerpt: "Common funnel mistakes that kill conversions and the systematic approach to building funnels that work.", category: "Conversion", slug: "#" },
  { title: "Content Marketing Metrics That Actually Matter", excerpt: "Stop tracking vanity metrics. Here are the KPIs that directly correlate with revenue growth.", category: "Content", slug: "#" },
  { title: "Building a Growth System: From Experiment to Scale", excerpt: "How to build a repeatable marketing system that compounds growth over time.", category: "Strategy", slug: "#" },
  { title: "The Power of A/B Testing in Digital Marketing", excerpt: "How systematic experimentation can unlock growth opportunities you never knew existed.", category: "Growth", slug: "#" },
];

const Blog = () => (
  <div className="min-h-screen pt-16">
    <DarkHero
      badge="Insights & Tactics"
      badgeIcon={<BookOpen size={14} className="text-electric" />}
      title={<>Growth <span className="text-electric">Blog</span></>}
      subtitle="Insights, strategies, and tactics from the NexBuildLabs growth team."
    />

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.title} delay={i * 0.05}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group h-full flex flex-col cursor-pointer"
              >
                <div className="h-48 bg-gradient-dark flex items-center justify-center relative overflow-hidden">
                  <span className="text-electric/50 font-heading font-bold text-6xl opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-500">{post.category[0]}</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-accent mb-2">{post.category}</span>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-accent transition-colors duration-300">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <span className="text-accent text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                    Read more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
