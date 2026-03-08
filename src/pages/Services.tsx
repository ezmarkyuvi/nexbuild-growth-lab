import { Link } from "react-router-dom";
import { Search, BarChart3, Globe, FileText, ArrowRight, CheckCircle } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";

const services = [
  {
    icon: Search,
    title: "Search Engine Optimization",
    overview: "Dominate organic search with comprehensive SEO strategies that drive sustainable, high-quality traffic.",
    benefits: ["Higher organic rankings", "Increased qualified traffic", "Better conversion rates", "Long-term ROI"],
    process: ["Technical SEO audit", "Keyword research & strategy", "On-page optimization", "Link building & outreach", "Performance tracking"],
    results: "Average 230% increase in organic traffic within 6 months.",
  },
  {
    icon: BarChart3,
    title: "Performance Marketing",
    overview: "Maximize your return on ad spend with precision-targeted campaigns across Google Ads and Meta Ads.",
    benefits: ["Higher ROAS", "Lower cost per acquisition", "Scalable ad spend", "Data-driven optimization"],
    process: ["Audience research", "Campaign architecture", "Ad creative development", "A/B testing", "Continuous optimization"],
    results: "Average 4.5x ROAS across all managed campaigns.",
  },
  {
    icon: Globe,
    title: "Website & Funnel Development",
    overview: "Conversion-focused websites and marketing funnels engineered for maximum performance.",
    benefits: ["Higher conversion rates", "Faster page speeds", "Mobile-first design", "Scalable architecture"],
    process: ["UX/UI design", "Development & integration", "Conversion optimization", "Performance tuning", "Launch & monitoring"],
    results: "Average 85% improvement in conversion rates.",
  },
  {
    icon: FileText,
    title: "Content Marketing",
    overview: "Strategic content that builds authority, trust, and a qualified pipeline of prospects.",
    benefits: ["Thought leadership", "Organic lead generation", "Brand authority", "Audience engagement"],
    process: ["Content strategy", "Editorial planning", "Content creation", "Distribution & promotion", "Performance analysis"],
    results: "Average 320% increase in qualified leads from content.",
  },
];

const Services = () => (
  <div className="min-h-screen pt-16">
    {/* Hero */}
    <section className="py-24 bg-gradient-hero relative">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            End-to-end digital growth services designed to generate measurable, scalable results.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Services */}
    {services.map((service, i) => (
      <section key={service.title} className={`py-24 ${i % 2 === 1 ? "bg-secondary" : ""}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6">
                  <service.icon className="text-accent" size={28} />
                </div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{service.overview}</p>
                <div className="bg-accent/5 border border-accent/10 rounded-xl p-6">
                  <div className="font-heading font-semibold text-sm mb-1">Expected Results</div>
                  <p className="text-accent font-medium">{service.results}</p>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-heading font-semibold mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((b) => (
                      <li key={b} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle size={16} className="text-accent shrink-0" /> {b}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-heading font-semibold mb-3">Our Process</h3>
                  <ol className="space-y-2">
                    {service.process.map((p, j) => (
                      <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-bold shrink-0">{j + 1}</span>
                        {p}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Let's discuss which services are right for your business.</p>
          <Link to="/contact" className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 group">
            Get Your Free Audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default Services;
