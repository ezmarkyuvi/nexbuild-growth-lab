import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const socials = [
  {
    name: "LinkedIn",
    url: "https://linkedin.com/company/nexbuildlabs",
    color: "#0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  {
    name: "X",
    url: "https://x.com/nexbuildlabs",
    color: "#000000",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "Instagram",
    url: "https://instagram.com/nexbuildlabs",
    color: "#E4405F",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@nexbuildlabs",
    color: "#FF0000",
    path: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/nexbuildlabs",
    color: "#1877F2",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
];

// Scattered start positions — wide spread
const scatteredPositions = [
  { x: -450, y: -250, rotation: -35 },
  { x: 480, y: -200, rotation: 40 },
  { x: -500, y: 200, rotation: -50 },
  { x: 420, y: 230, rotation: 25 },
  { x: -80, y: -320, rotation: 20 },
];

// Final positions around browser window
const finalPositions = [
  { x: -340, y: -120 },
  { x: 340, y: -120 },
  { x: -380, y: 100 },
  { x: 380, y: 100 },
  { x: 0, y: -200 },
];

const ConnectWithUs = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const icons = iconRefs.current.filter(Boolean) as HTMLAnchorElement[];
    if (!section || icons.length === 0) return;

    // Set scattered start positions immediately
    icons.forEach((icon, i) => {
      const pos = scatteredPositions[i];
      gsap.set(icon, {
        x: pos.x,
        y: pos.y,
        rotation: pos.rotation,
        scale: 0.5,
        opacity: 0.3,
      });
    });

    // Create scroll-triggered animation for each icon
    const triggers: ScrollTrigger[] = [];

    icons.forEach((icon, i) => {
      const final = finalPositions[i];
      const tween = gsap.to(icon, {
        x: final.x,
        y: final.y,
        rotation: 0,
        scale: 1,
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: section,
          start: "top 90%",
          end: "bottom 60%",
          scrub: 2.5,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-secondary relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-xs font-medium text-accent">Stay Connected</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">
          Connect <span className="text-gradient">With Us</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-20 text-lg">
          Follow our journey and stay updated with the latest growth insights.
        </p>

        {/* Central browser window + orbiting icons */}
        <div ref={containerRef} className="relative flex items-center justify-center" style={{ minHeight: "500px" }}>
          {/* Browser window — full width */}
          <div className="relative w-full max-w-3xl bg-card border border-border rounded-2xl shadow-card overflow-hidden z-10">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-muted/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-accent/60" />
                <div className="w-3 h-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-background border border-border rounded-md px-3 py-1 text-xs text-muted-foreground text-center truncate">
                  nexbuildlabs.com
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="p-6 md:p-8 text-center">
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-heading font-bold text-lg mb-2">Let's Connect</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Join our community across all platforms.
              </p>
            </div>
          </div>

          {/* Floating social icons */}
          {socials.map((social, i) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => { iconRefs.current[i] = el; }}
              className="absolute z-20 group cursor-pointer"
              style={{ top: "50%", left: "50%", marginTop: "-28px", marginLeft: "-28px" }}
              aria-label={social.name}
            >
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-card border border-border shadow-card flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-glow group-hover:border-accent/30">
                <svg
                  viewBox="0 0 24 24"
                  className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
                  fill={social.color}
                >
                  <path d={social.path} />
                </svg>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConnectWithUs;
