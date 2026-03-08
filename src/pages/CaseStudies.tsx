import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";

const caseStudies = [
  {
    title: "TechFlow SaaS",
    category: "SEO + Content",
    problem: "Low organic visibility and dependence on paid channels for lead generation.",
    strategy: "Comprehensive SEO overhaul with targeted content strategy and technical optimization.",
    results: [
      { value: 230, suffix: "%", label: "Organic Traffic Growth" },
      { value: 180, suffix: "%", label: "Lead Increase" },
      { value: 45, suffix: "%", label: "Lower CAC" },
    ],
  },
  {
    title: "GrowthStack",
    category: "Performance Marketing",
    problem: "Inefficient ad spend with declining ROAS across Google and Meta campaigns.",
    strategy: "Full campaign restructure with audience segmentation, creative testing, and bid optimization.",
    results: [
      { value: 4, suffix: ".5x", label: "ROAS Achieved" },
      { value: 60, suffix: "%", label: "Lower CPA" },
      { value: 3, suffix: "x", label: "Revenue Growth" },
    ],
  },
  {
    title: "ScaleUp Platform",
    category: "Full Stack Growth",
    problem: "Outdated website with poor conversion rates and no systematic marketing approach.",
    strategy: "Complete website rebuild with integrated marketing funnels and multi-channel growth strategy.",
    results: [
      { value: 320, suffix: "%", label: "Lead Increase" },
      { value: 85, suffix: "%", label: "Conversion Improvement" },
      { value: 200, suffix: "%", label: "Revenue Growth" },
    ],
  },
];

const CaseStudies = () => (
  <div className="min-h-screen pt-16">
    <section className="py-24 bg-gradient-hero relative">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Case <span className="text-gradient">Studies</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real results from real clients. See how our growth systems deliver measurable impact.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {caseStudies.map((cs, i) => (
      <section key={cs.title} className={`py-24 ${i % 2 === 1 ? "bg-secondary" : ""}`}>
        <div className="container mx-auto px-4 lg:px-8">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 bg-accent/10 rounded-full px-3 py-1 text-xs font-medium text-accent mb-4">
                <TrendingUp size={12} /> {cs.category}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-8">{cs.title}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div>
                  <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-2">The Problem</h3>
                  <p className="text-foreground leading-relaxed">{cs.problem}</p>
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-sm text-muted-foreground mb-2">Our Strategy</h3>
                  <p className="text-foreground leading-relaxed">{cs.strategy}</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8">
                <h3 className="font-heading font-semibold text-center mb-8">Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {cs.results.map((r) => (
                    <CountUp key={r.label} end={r.value} suffix={r.suffix} prefix="+" label={r.label} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    ))}

    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Want results like these?</h2>
          <p className="text-muted-foreground max-w-lg mx-auto mb-8">Let's build your custom growth strategy.</p>
          <Link to="/contact" className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all inline-flex items-center gap-2 group">
            Get Your Free Audit <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default CaseStudies;
