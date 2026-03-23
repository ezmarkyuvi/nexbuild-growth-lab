import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Mail,
  Phone,
  Globe,
  PenSquare,
  Store,
  Sparkles,
  Palette,
  TrendingUp,
} from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import { blogPosts } from "@/data/blogPosts";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen pt-16">
        <section className="py-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            <h1 className="text-3xl font-heading font-bold mb-4">Blog post not found</h1>
            <p className="text-muted-foreground mb-6">The article you requested does not exist.</p>
            <Link to="/blog" className="text-accent font-medium inline-flex items-center gap-2">
              <ArrowLeft size={16} /> Back to blog
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <section className="relative overflow-hidden bg-navy py-20 md:py-24 border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent/5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-heading font-bold text-4xl md:text-7xl tracking-wide text-primary-foreground">
              NEX<span className="text-accent">BUILD</span>LABS
            </h1>
            <p className="mt-4 text-xl md:text-3xl text-primary-foreground/70 font-heading">Build. Grow. Scale.</p>

            <div className="mt-10 flex items-center justify-center gap-5 md:gap-7 text-primary-foreground/85">
              <PenSquare size={30} />
              <Globe size={30} />
              <Store size={30} />
              <Sparkles size={30} />
              <Palette size={30} />
              <TrendingUp size={30} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <AnimatedSection>
            <Link to="/blog" className="text-accent font-medium inline-flex items-center gap-2 mb-8">
              <ArrowLeft size={16} /> Back to blog
            </Link>

            <div className="text-sm text-muted-foreground mb-8">
              Published: {new Date(post.publishedAt).toLocaleDateString()}
            </div>

            <article className="space-y-10">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-2xl font-heading font-bold border-l-4 border-accent pl-4">{section.heading}</h2>
                  {section.paragraphs.map((paragraph, idx) => (
                    <p key={`${section.heading}-${idx}`} className="text-muted-foreground leading-8">
                      {paragraph}
                    </p>
                  ))}

                  {section.bullets && section.bullets.length > 0 ? (
                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                      {section.bullets.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </article>

            <div className="mt-14 bg-navy rounded-3xl p-8 md:p-10 relative overflow-hidden border border-accent/20">
              <div className="absolute top-0 left-1/3 w-72 h-72 bg-electric/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary-foreground mb-3">
                  Ready to <span className="text-gradient">Scale Your Growth</span>?
                </h3>
                <p className="text-primary-foreground/70 mb-6 max-w-2xl">
                  Turn strategy into measurable revenue with NexBuildLabs. Talk to our team and get a focused growth action plan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <a href="mailto:business@nexbuildlabs.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-foreground/90 hover:border-accent/40 transition-colors inline-flex items-center gap-2">
                    <Mail size={16} className="text-accent" /> business@nexbuildlabs.com
                  </a>
                  <a href="tel:+917589078348" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-foreground/90 hover:border-accent/40 transition-colors inline-flex items-center gap-2">
                    <Phone size={16} className="text-accent" /> +91 75890-78348
                  </a>
                  <a href="https://nexbuildlabs.com" target="_blank" rel="noreferrer noopener" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-primary-foreground/90 hover:border-accent/40 transition-colors inline-flex items-center gap-2">
                    <Globe size={16} className="text-accent" /> nexbuildlabs.com
                  </a>
                </div>

                <Link
                  to="/contact"
                  className="bg-gradient-primary text-accent-foreground px-7 py-3 rounded-xl text-sm font-semibold hover:opacity-90 inline-flex items-center gap-2"
                >
                  Get Free Growth Audit
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
