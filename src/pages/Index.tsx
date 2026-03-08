import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Search, BarChart3, Globe, FileText, Zap, FlaskConical, Target, TrendingUp, Rocket } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";
import HeroBackground from "@/components/HeroBackground";
import FloatingDashboard from "@/components/FloatingDashboard";

const services = [
  { icon: Search, title: "Search Engine Optimization", desc: "Dominate organic search with data-backed SEO strategies that drive sustainable traffic growth." },
  { icon: BarChart3, title: "Performance Marketing", desc: "Maximize ROAS with precision-targeted Google Ads & Meta Ads campaigns." },
  { icon: Globe, title: "Website & Funnel Development", desc: "Conversion-focused websites and funnels engineered for growth." },
  { icon: FileText, title: "Content Marketing & Strategy", desc: "Strategic content that builds authority, trust, and qualified pipeline." },
];

const growthSteps = [
  { icon: Search, title: "Discover", desc: "Deep-dive into your market, competitors, and growth opportunities." },
  { icon: FlaskConical, title: "Build", desc: "Engineer your digital infrastructure for scalable growth." },
  { icon: Zap, title: "Experiment", desc: "Run rapid tests across channels to find winning strategies." },
  { icon: Target, title: "Optimize", desc: "Continuously refine based on real performance data." },
  { icon: Rocket, title: "Scale", desc: "Amplify what works and compound your growth." },
];

const testimonials = [
  { name: "Sarah Chen", role: "CEO, TechFlow", text: "NexBuildLabs transformed our digital presence. We saw a 300% increase in qualified leads within 4 months." },
  { name: "Marcus Rivera", role: "Founder, GrowthStack", text: "Their data-driven approach to marketing is unlike anything we've experienced. True growth partners." },
  { name: "Emily Watson", role: "CMO, ScaleUp", text: "The team at NexBuildLabs doesn't just run campaigns — they build growth systems. Phenomenal results." },
];

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Interactive canvas background */}
        <HeroBackground />
        
        {/* Ambient gradient layers */}
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-xs font-medium text-accent">Digital Growth Lab</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-4xl sm:text-5xl md:text-7xl font-heading font-bold tracking-tight leading-[1.1] mb-6"
            >
              We Build, Test, and Scale{" "}
              <span className="text-gradient">Digital Growth.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              NexBuildLabs helps startups and businesses grow using data-driven marketing systems, performance advertising, and scalable digital strategies.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/contact">
                <motion.div
                  whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(234, 120, 28, 0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold flex items-center gap-2 group"
                >
                  Get a Free Growth Audit
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
              <Link to="/services">
                <motion.div
                  whileHover={{ scale: 1.04, backgroundColor: "hsl(var(--secondary))" }}
                  whileTap={{ scale: 0.97 }}
                  className="border border-border text-foreground px-8 py-3.5 rounded-xl text-sm font-semibold transition-colors"
                >
                  View Services
                </motion.div>
              </Link>
            </motion.div>

            {/* Floating Dashboard Mockup */}
            <FloatingDashboard />
          </div>
        </div>
      </section>

      {/* Trust / Social Proof */}
      <section className="py-20 border-b border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CountUp end={150} suffix="+" label="Projects Delivered" />
            <CountUp end={500} suffix="+" label="Campaigns Optimized" />
            <CountUp end={10} suffix="M+" label="Traffic Growth Achieved" />
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              What We <span className="text-gradient">Do</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">End-to-end digital growth services designed to generate measurable results.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <AnimatedSection key={service.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:border-accent/30 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 group-hover:scale-110 transition-all duration-300">
                      <service.icon className="text-accent group-hover:scale-110 transition-transform duration-300" size={24} />
                    </div>
                    <h3 className="font-heading text-xl font-semibold mb-3 group-hover:text-accent transition-colors duration-300">{service.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                    <div className="mt-4 flex items-center gap-1 text-accent text-sm font-medium opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      Learn more <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Growth System */}
      <section className="py-24 bg-navy text-primary-foreground">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              The NexBuildLabs <span className="text-electric">Growth System</span>
            </h2>
            <p className="text-primary-foreground/60 max-w-xl mx-auto">Our proven 5-step framework for predictable, scalable growth.</p>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {growthSteps.map((step, i) => (
              <AnimatedSection key={step.title} delay={i * 0.15}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-2xl bg-electric/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-electric/20 group-hover:shadow-glow transition-all duration-300">
                    <step.icon className="text-electric group-hover:scale-110 transition-transform duration-300" size={28} />
                  </div>
                  <div className="text-xs font-semibold text-electric mb-2 group-hover:tracking-wider transition-all duration-300">0{i + 1}</div>
                  <h3 className="font-heading text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-primary-foreground/50 text-sm leading-relaxed group-hover:text-primary-foreground/70 transition-colors duration-300">{step.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              Results That <span className="text-gradient">Speak</span>
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CountUp end={230} prefix="+" suffix="%" label="Organic Traffic Growth" />
            <CountUp end={4} suffix=".5x" label="ROAS on Paid Campaigns" />
            <CountUp end={320} prefix="+" suffix="%" label="Increase in Qualified Leads" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
              What Our <span className="text-gradient">Clients Say</span>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-card border border-border rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:border-accent/20 transition-all duration-300 group h-full"
                >
                  <div className="text-accent/30 text-4xl font-heading font-bold leading-none mb-3 group-hover:text-accent/50 transition-colors duration-300">"</div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent font-heading font-bold text-sm group-hover:bg-accent/20 transition-colors duration-300">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-heading font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="bg-navy rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                  Ready to Build Your Digital Growth Engine?
                </h2>
                <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
                  Book a free strategy call and discover how our growth systems can transform your business.
                </p>
                <Link
                  to="/contact"
                  className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all hover:shadow-glow inline-flex items-center gap-2 group"
                >
                  Get Your Free Growth Audit
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
};

export default Index;
