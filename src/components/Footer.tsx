import { Link } from "react-router-dom";
import { usePublicCms } from "@/hooks/usePublicCms";

const Footer = () => {
  const { footerMenu, settings } = usePublicCms();
  const primaryCtaLink = String(settings.primary_cta_link ?? "/contact");
  const primaryCtaLabel = String(settings.primary_cta_label ?? "Free Growth Audit");
  const companyLinks = footerMenu.filter((item) => !item.is_cta).slice(0, 4);
  const serviceLinks = footerMenu.filter((item) => item.is_cta).length
    ? footerMenu.filter((item) => item.is_cta)
    : footerMenu.slice(0, 4);

  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <h3 className="font-heading text-xl font-bold mb-3">{String(settings.brand_name ?? "NexBuildLabs")}</h3>
            <p className="text-sm text-primary-foreground/60 leading-relaxed">
              {String(settings.brand_tagline ?? "Data-driven digital growth for startups and businesses ready to scale.")}
            </p>
          </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            {serviceLinks.map((link) => (
              <li key={link.id}><Link to={link.path} className="hover:text-electric transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            {companyLinks.map((link) => (
              <li key={link.id}><Link to={link.path} className="hover:text-electric transition-colors">{link.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Get Started</h4>
          <p className="text-sm text-primary-foreground/50 mb-4">Ready to scale your growth?</p>
          <Link
            to={primaryCtaLink}
            className="bg-gradient-primary text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold inline-block hover:opacity-90 transition-opacity"
          >
            {primaryCtaLabel}
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} {String(settings.brand_name ?? "NexBuildLabs")}. All rights reserved.
      </div>
    </div>
  </footer>
  );
};

export default Footer;
