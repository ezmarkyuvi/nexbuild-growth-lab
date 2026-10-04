import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePublicCms } from "@/hooks/usePublicCms";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { headerMenu, settings } = usePublicCms();
  const navLinks = headerMenu.filter((item) => !item.is_cta);
  const ctaLink = headerMenu.find((item) => item.is_cta);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-xl border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight text-foreground">
          {String(settings.brand_name ?? "NexBuildLabs")}
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-medium transition-colors hover:text-accent ${
                location.pathname === link.path ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-accent rounded-full transition-all duration-300 ${
                location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>
          ))}
          <Link
            to={ctaLink?.path || String(settings.primary_cta_link ?? "/contact")}
            className="bg-gradient-primary text-accent-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            {ctaLink?.label || String(settings.primary_cta_label ?? "Get Audit")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card border-b border-border overflow-hidden"
          >
            <div className="flex flex-col px-4 py-4 gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-accent" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to={ctaLink?.path || String(settings.primary_cta_link ?? "/contact")}
                onClick={() => setMobileOpen(false)}
                className="bg-gradient-primary text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold text-center mt-2"
              >
                {ctaLink?.label || String(settings.primary_cta_label ?? "Get Free Audit")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
