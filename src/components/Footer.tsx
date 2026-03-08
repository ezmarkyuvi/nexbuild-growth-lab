import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="bg-navy text-primary-foreground">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <h3 className="font-heading text-xl font-bold mb-3">
            Nex<span className="text-electric">Build</span>Labs
          </h3>
          <p className="text-sm text-primary-foreground/60 leading-relaxed">
            Data-driven digital growth for startups and businesses ready to scale.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Services</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li><Link to="/services" className="hover:text-electric transition-colors">SEO</Link></li>
            <li><Link to="/services" className="hover:text-electric transition-colors">Performance Marketing</Link></li>
            <li><Link to="/services" className="hover:text-electric transition-colors">Web Development</Link></li>
            <li><Link to="/services" className="hover:text-electric transition-colors">Content Marketing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/50">
            <li><Link to="/about" className="hover:text-electric transition-colors">About</Link></li>
            <li><Link to="/case-studies" className="hover:text-electric transition-colors">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-electric transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-electric transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-heading text-sm font-semibold mb-4 text-primary-foreground/80">Get Started</h4>
          <p className="text-sm text-primary-foreground/50 mb-4">Ready to scale your growth?</p>
          <Link
            to="/contact"
            className="bg-gradient-primary text-accent-foreground px-5 py-2.5 rounded-lg text-sm font-semibold inline-block hover:opacity-90 transition-opacity"
          >
            Free Growth Audit
          </Link>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-6 text-center text-xs text-primary-foreground/40">
        © {new Date().getFullYear()} NexBuildLabs. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
