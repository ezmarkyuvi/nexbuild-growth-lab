import { ReactNode } from "react";
import AnimatedSection from "@/components/AnimatedSection";

interface DarkHeroProps {
  badge?: string;
  badgeIcon?: ReactNode;
  title: ReactNode;
  subtitle: string;
}

const DarkHero = ({ badge, badgeIcon, title, subtitle }: DarkHeroProps) => (
  <section className="py-28 bg-navy text-primary-foreground relative overflow-hidden">
    <div className="absolute inset-0">
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-electric/8 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-purple/6 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "2s" }} />
    </div>
    <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
      <AnimatedSection>
        {badge && (
          <div className="inline-flex items-center gap-2 bg-electric/10 border border-electric/20 rounded-full px-4 py-1.5 mb-6">
            {badgeIcon}
            <span className="text-xs font-medium text-electric">{badge}</span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6 leading-[1.1]">
          {title}
        </h1>
        <p className="text-primary-foreground/60 max-w-2xl mx-auto text-lg">
          {subtitle}
        </p>
      </AnimatedSection>
    </div>
  </section>
);

export default DarkHero;
