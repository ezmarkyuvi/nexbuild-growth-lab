import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const channels = [
  {
    name: "SEO",
    color: "hsl(var(--accent))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" strokeLinecap="round" />
      </svg>
    ),
    start: { x: -420, y: -260 },
    end: { x: -240, y: -130 },
  },
  {
    name: "Paid Ads",
    color: "hsl(var(--electric))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    start: { x: 450, y: -220 },
    end: { x: 240, y: -130 },
  },
  {
    name: "Social",
    color: "hsl(var(--purple))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    start: { x: -480, y: 180 },
    end: { x: -260, y: 110 },
  },
  {
    name: "Email",
    color: "hsl(var(--accent))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    start: { x: 400, y: 200 },
    end: { x: 260, y: 110 },
  },
  {
    name: "Content",
    color: "hsl(var(--electric-glow))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points="14,2 14,8 20,8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" />
        <line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" />
      </svg>
    ),
    start: { x: -60, y: -320 },
    end: { x: 0, y: -170 },
  },
  {
    name: "Analytics",
    color: "hsl(var(--purple-light))",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <line x1="18" y1="20" x2="18" y2="10" strokeLinecap="round" />
        <line x1="12" y1="20" x2="12" y2="4" strokeLinecap="round" />
        <line x1="6" y1="20" x2="6" y2="14" strokeLinecap="round" />
      </svg>
    ),
    start: { x: 60, y: 300 },
    end: { x: 0, y: 170 },
  },
];

const GrowthEngine = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-navy relative overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple/6 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs font-medium text-accent">Growth Engine</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            All Channels. <span className="text-gradient">One System.</span>
          </h2>
          <p className="text-primary-foreground/50 max-w-xl mx-auto mb-20 text-lg">
            Every marketing channel connects into a unified growth dashboard — powered by data, driven by results.
          </p>
        </motion.div>

        {/* Animation area */}
        <div className="relative flex items-center justify-center" style={{ minHeight: "520px" }}>
          {/* Connection lines — appear after icons settle */}
          {channels.map((channel, i) => (
            <motion.div
              key={`line-${channel.name}`}
              className="absolute pointer-events-none"
              style={{
                top: "50%",
                left: "50%",
                width: Math.sqrt(channel.end.x ** 2 + channel.end.y ** 2),
                height: "1px",
                transformOrigin: "0 0",
                rotate: `${Math.atan2(channel.end.y, channel.end.x) * (180 / Math.PI)}deg`,
              }}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 0.3, scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.08 }}
            >
              <div className="w-full h-px bg-gradient-to-r from-accent/40 to-transparent" />
            </motion.div>
          ))}

          {/* Central dashboard */}
          <motion.div
            className="relative w-full max-w-md bg-card/10 border border-border/20 rounded-2xl shadow-card overflow-hidden z-10 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border/20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-primary-foreground/5 border border-border/10 rounded-md px-3 py-1 text-xs text-primary-foreground/40 text-center">
                  nexbuildlabs.com/dashboard
                </div>
              </div>
            </div>

            {/* Dashboard content */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: "Traffic", value: "24.8K", change: "+23%" },
                  { label: "Leads", value: "1,247", change: "+18%" },
                  { label: "Revenue", value: "$84K", change: "+31%" },
                ].map((metric) => (
                  <motion.div
                    key={metric.label}
                    className="bg-primary-foreground/5 rounded-lg p-3 text-center"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.5 }}
                  >
                    <div className="text-[10px] text-primary-foreground/30 mb-1">{metric.label}</div>
                    <div className="text-sm font-heading font-bold text-primary-foreground">{metric.value}</div>
                    <div className="text-[10px] text-accent font-medium">{metric.change}</div>
                  </motion.div>
                ))}
              </div>

              {/* Mini chart bars */}
              <div className="flex items-end gap-1 h-12 justify-center">
                {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    className="w-2 rounded-sm bg-accent/40"
                    initial={{ height: 0 }}
                    animate={isInView ? { height: `${h}%` } : {}}
                    transition={{ duration: 0.6, delay: 1.6 + i * 0.05, ease: "easeOut" }}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Floating channel icons */}
          {channels.map((channel, i) => (
            <motion.div
              key={channel.name}
              className="absolute z-20 group cursor-default"
              style={{ top: "50%", left: "50%", marginTop: "-28px", marginLeft: "-28px" }}
              initial={{
                x: channel.start.x,
                y: channel.start.y,
                scale: 0.4,
                opacity: 0,
                rotate: (i % 2 === 0 ? -1 : 1) * 30,
              }}
              animate={
                isInView
                  ? {
                      x: channel.end.x,
                      y: channel.end.y,
                      scale: 1,
                      opacity: 1,
                      rotate: 0,
                    }
                  : {}
              }
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 12,
                mass: 1.2,
                delay: 0.4 + i * 0.12,
              }}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card/10 border border-border/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow group-hover:border-accent/30 group-hover:bg-card/20 text-primary-foreground/70 group-hover:text-accent">
                {channel.icon}
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-primary-foreground/40 group-hover:text-accent/80 transition-colors duration-300 whitespace-nowrap">
                {channel.name}
              </span>
            </motion.div>
          ))}

          {/* Central glow pulse */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-accent/10 blur-3xl pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: [0, 1.5, 1], opacity: [0, 0.6, 0.3] } : {}}
            transition={{ duration: 1.5, delay: 0.8 }}
          />
        </div>
      </div>
    </section>
  );
};

export default GrowthEngine;
