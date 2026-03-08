import { Link } from "react-router-dom";
import { ArrowRight, FlaskConical, Target, BarChart3, Lightbulb, Beaker } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import DarkHero from "@/components/DarkHero";

const values = [
  { icon: FlaskConical, title: "The Labs Model", desc: "We treat marketing like a science — every campaign is an experiment, every result a data point. This iterative approach eliminates guesswork and compounds growth." },
  { icon: Target, title: "Data-Driven Decisions", desc: "Every strategy is backed by data, every optimization informed by analytics. We don't guess — we test, measure, and scale what works." },
  { icon: BarChart3, title: "Growth Systems", desc: "We build repeatable marketing systems, not one-off campaigns. Systems that generate predictable, scalable results month after month." },
  { icon: Lightbulb, title: "Innovation First", desc: "We stay ahead of the curve with emerging channels, AI tools, and growth tactics — giving our clients an unfair advantage." },
];

const About = () => (
  <div className="min-h-screen pt-16">
    <DarkHero
      badge="Who We Are"
      badgeIcon={<Beaker size={14} className="text-electric" />}
      title={<>About <span className="text-electric">NexBuildLabs</span></>}
      subtitle="We're a digital growth lab on a mission to help ambitious businesses scale through data-driven marketing systems."
    />

    {/* Mission */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">Our Mission</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              To democratize growth by giving startups and businesses access to enterprise-grade marketing systems, 
              performance strategies, and digital infrastructure — powered by data, driven by experimentation.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* Values */}
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Why the "Labs" Model Works</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Our approach combines scientific rigor with creative execution.</p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((v, i) => (
            <AnimatedSection key={v.title} delay={i * 0.1}>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-card h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <v.icon className="text-accent" size={24} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{v.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Let's build growth together.</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Ready to see what data-driven marketing can do for your business?</p>
          <Link to="/contact" className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 group">
            Start a Conversation <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default About;
