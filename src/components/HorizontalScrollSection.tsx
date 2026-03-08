import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Search, FlaskConical, Zap, Target, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    icon: Search,
    step: "01",
    title: "Discover",
    desc: "We analyze the business, audience, and growth opportunities.",
    accent: "from-accent/20 to-accent/5",
  },
  {
    icon: FlaskConical,
    step: "02",
    title: "Build",
    desc: "We design and implement scalable marketing systems.",
    accent: "from-accent/15 to-purple/10",
  },
  {
    icon: Zap,
    step: "03",
    title: "Experiment",
    desc: "We test multiple marketing strategies and channels.",
    accent: "from-purple/15 to-accent/10",
  },
  {
    icon: Target,
    step: "04",
    title: "Optimize",
    desc: "We improve campaigns using data and performance insights.",
    accent: "from-accent/10 to-purple/15",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Scale",
    desc: "We scale the highest-performing strategies.",
    accent: "from-purple/10 to-accent/20",
  },
];

const HorizontalScrollSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    if (!section || !trigger) return;

    // Small delay to ensure DOM is fully ready
    const timer = setTimeout(() => {
      const totalScroll = section.scrollWidth - trigger.offsetWidth;

      const tween = gsap.to(section, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      tweenRef.current = tween;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (tweenRef.current) {
        const st = tweenRef.current.scrollTrigger;
        if (st) st.kill();
        tweenRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={triggerRef} className="overflow-hidden bg-navy">
      <div
        ref={sectionRef}
        className="flex items-center gap-8 px-8 lg:px-16 will-change-transform"
        style={{ width: "fit-content" }}
      >
        {/* Intro panel */}
        <div className="flex-shrink-0 w-[90vw] md:w-[50vw] lg:w-[40vw] h-screen flex flex-col justify-center pr-8">
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6 w-fit backdrop-blur-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-medium text-accent">Our Process</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground leading-tight mb-6">
            The NexBuildLabs{" "}
            <span className="text-gradient">Growth System</span>
          </h2>
          <p className="text-primary-foreground/50 text-lg max-w-md leading-relaxed">
            Our proven 5-step framework for predictable, scalable growth. Scroll to explore each phase.
          </p>
          <div className="mt-10 flex items-center gap-3 text-primary-foreground/30">
            <div className="w-12 h-[1px] bg-primary-foreground/20" />
            <span className="text-xs font-medium tracking-widest uppercase">Scroll to explore</span>
            <motion.div
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-accent"
            >
              →
            </motion.div>
          </div>
        </div>

        {/* Cards */}
        {cards.map((card, i) => (
          <div
            key={card.title}
            className="flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[32vw] h-screen flex items-center"
          >
            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative w-full bg-card/5 border border-border/10 rounded-3xl p-10 md:p-14 group cursor-pointer backdrop-blur-sm overflow-hidden h-[70vh] flex flex-col justify-between"
            >
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`} />

              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-accent/5 rounded-full blur-3xl group-hover:bg-accent/15 transition-all duration-700" />

              <div className="relative z-10">
                {/* Step number */}
                <div className="text-7xl md:text-8xl font-heading font-bold text-primary-foreground/5 group-hover:text-accent/15 transition-colors duration-500 leading-none mb-8">
                  {card.step}
                </div>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-8 group-hover:bg-accent/20 group-hover:shadow-glow group-hover:scale-110 transition-all duration-300">
                  <card.icon className="text-accent" size={32} />
                </div>

                {/* Title */}
                <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {card.title}
                </h3>
              </div>

              <div className="relative z-10">
                {/* Description */}
                <p className="text-primary-foreground/40 text-base md:text-lg leading-relaxed group-hover:text-primary-foreground/70 transition-colors duration-300 mb-6">
                  {card.desc}
                </p>

                {/* Bottom bar */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-[2px] bg-accent/30 group-hover:w-16 group-hover:bg-accent transition-all duration-500" />
                    <span className="text-xs font-medium text-accent/50 group-hover:text-accent transition-colors duration-300 tracking-wider uppercase">
                      Phase {i + 1}
                    </span>
                  </div>
                  <motion.div
                    className="w-10 h-10 rounded-full border border-border/10 flex items-center justify-center text-primary-foreground/20 group-hover:border-accent/30 group-hover:text-accent transition-all duration-300"
                    whileHover={{ rotate: 45 }}
                  >
                    →
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-[10vw]" />
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
