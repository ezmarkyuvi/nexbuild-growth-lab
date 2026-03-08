import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const channels = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/nexbuildlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    brandColor: "#0A66C2",
    start: { x: -420, y: -260 },
    end: { x: -240, y: -130 },
  },
  {
    name: "X",
    url: "https://x.com/nexbuildlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    brandColor: "#ffffff",
    start: { x: 450, y: -220 },
    end: { x: 240, y: -130 },
  },
  {
    name: "Instagram",
    url: "https://instagram.com/nexbuildlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    brandColor: "#E4405F",
    start: { x: -480, y: 180 },
    end: { x: -260, y: 110 },
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@nexbuildlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    brandColor: "#FF0000",
    start: { x: 400, y: 200 },
    end: { x: 260, y: 110 },
  },
  {
    name: "Facebook",
    url: "https://facebook.com/nexbuildlabs",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    brandColor: "#1877F2",
    start: { x: -60, y: -320 },
    end: { x: 0, y: -170 },
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
            <motion.a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute z-20 group cursor-pointer"
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
              aria-label={channel.name}
            >
              <div
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card/10 border border-border/20 backdrop-blur-sm flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow group-hover:border-accent/30 group-hover:bg-card/20 text-primary-foreground/70"
                style={{ ["--hover-color" as string]: channel.brandColor }}
              >
                <div className="group-hover:text-accent transition-colors duration-300">
                  {channel.icon}
                </div>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-primary-foreground/40 group-hover:text-accent/80 transition-colors duration-300 whitespace-nowrap">
                {channel.name}
              </span>
            </motion.a>
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
