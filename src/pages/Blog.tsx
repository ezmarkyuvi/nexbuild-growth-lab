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
    <section className="py-24 bg-gradient-hero relative">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Growth <span className="text-gradient">Blog</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Insights, strategies, and tactics from the NexBuildLabs growth team.
          </p>
        </AnimatedSection>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.title} delay={i * 0.05}>
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all group h-full flex flex-col">
                <div className="h-48 bg-gradient-dark flex items-center justify-center">
                  <span className="text-electric/50 font-heading font-bold text-6xl opacity-20">{post.category[0]}</span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <span className="text-xs font-semibold text-accent mb-2">{post.category}</span>
                  <h3 className="font-heading text-lg font-semibold mb-2 group-hover:text-accent transition-colors">{post.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
                  <span className="text-accent text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default Blog;
