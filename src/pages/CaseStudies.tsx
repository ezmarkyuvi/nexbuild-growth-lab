import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Search, BarChart3, Layers, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import CountUp from "@/components/CountUp";

const caseStudies = [
  {
    title: "TechFlow SaaS",
    category: "SEO + Content",
    icon: Search,
    color: "from-accent to-purple",
    problem: "Low organic visibility and dependence on paid channels for lead generation.",
    strategy: "Comprehensive SEO overhaul with targeted content strategy and technical optimization.",
    timeline: "6 months",
    industry: "B2B SaaS",
    results: [
      { value: 230, suffix: "%", label: "Organic Traffic Growth" },
      { value: 180, suffix: "%", label: "Lead Increase" },
      { value: 45, suffix: "%", label: "Lower CAC" },
    ],
    chartData: [18, 22, 28, 35, 50, 62, 74, 88, 95, 100, 110, 130],
  },
  {
    title: "GrowthStack",
    category: "Performance Marketing",
    icon: BarChart3,
    color: "from-electric to-accent",
    problem: "Inefficient ad spend with declining ROAS across Google and Meta campaigns.",
    strategy: "Full campaign restructure with audience segmentation, creative testing, and bid optimization.",
    timeline: "4 months",
    industry: "E-Commerce",
    results: [
      { value: 4, suffix: ".5x", label: "ROAS Achieved" },
      { value: 60, suffix: "%", label: "Lower CPA" },
      { value: 3, suffix: "x", label: "Revenue Growth" },
    ],
    chartData: [40, 38, 35, 42, 55, 65, 72, 80, 88, 92, 96, 100],
  },
  {
    title: "ScaleUp Platform",
    category: "Full Stack Growth",
    icon: Layers,
    color: "from-purple to-electric",
    problem: "Outdated website with poor conversion rates and no systematic marketing approach.",
    strategy: "Complete website rebuild with integrated marketing funnels and multi-channel growth strategy.",
    timeline: "8 months",
    industry: "FinTech",
    results: [
      { value: 320, suffix: "%", label: "Lead Increase" },
      { value: 85, suffix: "%", label: "Conversion Improvement" },
      { value: 200, suffix: "%", label: "Revenue Growth" },
    ],
    chartData: [10, 15, 20, 30, 38, 52, 68, 80, 90, 100, 115, 130],
  },
];

const MiniChart = ({ data, color }: { data: number[]; color: string }) => {
  const max = Math.max(...data);
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - (v / max) * 80}`)
    .join(" ");
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`grad-${color}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--electric))" stopOpacity="0.3" />
          <stop offset="100%" stopColor="hsl(var(--electric))" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#grad-${color})`} />
      <polyline
        points={points}
        fill="none"
        stroke="hsl(var(--electric))"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
};

const CaseStudies = () => (
  <div className="min-h-screen pt-16">
    {/* Hero */}
    <section className="py-28 bg-navy text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric/8 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple/6 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <AnimatedSection>
          <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 rounded-full px-4 py-1.5 mb-6">
            <TrendingUp size={14} className="text-electric" />
            <span className="text-xs font-medium text-electric">Proven Results</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1]">
            Case <span className="text-electric">Studies</span>
          </h1>
          <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
            Real results from real clients. See how our growth systems deliver measurable, compounding impact.
          </p>
        </AnimatedSection>
      </div>
    </section>

    {/* Case Studies */}
    {caseStudies.map((cs, i) => (
      <section key={cs.title} className="py-20 md:py-28 border-b border-border last:border-b-0">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Header row */}
            <AnimatedSection>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                      <cs.icon className="text-accent" size={20} />
                    </div>
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{cs.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-heading font-bold">{cs.title}</h2>
                </div>
                <div className="flex gap-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Industry</div>
                    <div className="font-heading font-semibold text-sm">{cs.industry}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Timeline</div>
                    <div className="font-heading font-semibold text-sm">{cs.timeline}</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-10">
              {/* Problem & Strategy */}
              <AnimatedSection className="lg:col-span-2 space-y-6" delay={0.1}>
                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-destructive" />
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground">The Problem</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{cs.problem}</p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -2 }}
                  className="bg-card border border-border rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-muted-foreground">Our Strategy</h3>
                  </div>
                  <p className="text-foreground leading-relaxed">{cs.strategy}</p>
                </motion.div>
              </AnimatedSection>

              {/* Chart + Results */}
              <AnimatedSection className="lg:col-span-3" delay={0.2}>
                <div className="bg-card border border-border rounded-2xl shadow-card overflow-hidden h-full">
                  {/* Mini chart */}
                  <div className="px-6 pt-6 pb-2">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-heading font-semibold text-sm">Growth Trajectory</h3>
                      <div className="flex items-center gap-1 text-accent text-xs font-medium">
                        <ArrowUpRight size={14} />
                        Trending up
                      </div>
                    </div>
                    <div className="h-32 md:h-40">
                      <MiniChart data={cs.chartData} color={`chart-${i}`} />
                    </div>
                  </div>

                  {/* Results row */}
                  <div className="border-t border-border bg-secondary/30 p-6">
                    <div className="grid grid-cols-3 gap-4">
                      {cs.results.map((r, j) => (
                        <motion.div
                          key={r.label}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 + j * 0.1 }}
                          className="text-center"
                        >
                          <div className="font-heading text-2xl md:text-3xl font-bold text-gradient mb-1">
                            +{r.value}{r.suffix}
                          </div>
                          <div className="text-[10px] md:text-xs text-muted-foreground leading-tight">{r.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    ))}

    {/* CTA */}
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <div className="bg-navy rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-electric/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
                Want results like these?
              </h2>
              <p className="text-primary-foreground/60 max-w-lg mx-auto mb-8">
                Let's build your custom growth strategy and unlock your next level of scale.
              </p>
              <Link
                to="/contact"
                className="bg-gradient-primary text-accent-foreground px-8 py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-all hover:shadow-glow inline-flex items-center gap-2 group"
              >
                Get Your Free Audit
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  </div>
);

export default CaseStudies;
