import { useRef, useState } from "react";
import { ArrowRight, Mail, Send, MessageCircle, Loader2, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import DarkHero from "@/components/DarkHero";
import { toast } from "sonner";

const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwulK7LFD3id6Ml-8HsMAVygOeNa4kv5jqbbmbOt9lBvT5bdGCke2JmhDxk43-XFm_-8w/exec";

const SERVICE_OPTIONS = [
  "SEO",
  "SMM",
  "Web dev",
  "App dev",
  "Design",
  "Project Management",
  "Content Management",
  "Social Media",
];

const Contact = () => {
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    phone_number: "",
    email: "",
    website: "",
    service_needed: [] as string[],
    notes: "",
    budget_currency: "USD",
    budget_amount: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const servicesScrollRef = useRef<HTMLDivElement | null>(null);

  const toggleService = (service: string) => {
    setForm((prev) => ({
      ...prev,
      service_needed: prev.service_needed.includes(service)
        ? prev.service_needed.filter((s) => s !== service)
        : [...prev.service_needed, service],
    }));
  };

  const selectedServicesText =
    form.service_needed.length > 0 ? form.service_needed.join(", ") : "Select one or more services";

  const handleServicesWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const container = servicesScrollRef.current;
    e.preventDefault();
    e.stopPropagation();

    if (!container) return;

    container.scrollTop += e.deltaY;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.service_needed.length === 0) {
      toast.error("Please select at least one service.");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        company_name: form.company_name,
        contact_person: form.contact_person,
        phone_number: form.phone_number,
        email: form.email,
        website: form.website,
        service_needed: form.service_needed.join(", "),
        notes: form.notes,
        budget: `${form.budget_currency} ${form.budget_amount}`,
      };

      await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
        method: "POST",
        // Apps Script web apps often fail CORS preflight from static sites.
        // Use a simple request and no-cors so the browser sends the payload.
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      toast.success("Thank you! We'll be in touch within 24 hours.");
      setForm({
        company_name: "",
        contact_person: "",
        phone_number: "",
        email: "",
        website: "",
        service_needed: [],
        notes: "",
        budget_currency: "USD",
        budget_amount: ""
      });
    } catch (err) {
      console.error('Submit error:', err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <DarkHero
        badge="Get In Touch"
        badgeIcon={<MessageCircle size={14} className="text-electric" />}
        title={<>Let's <span className="text-electric">Talk Growth</span></>}
        subtitle="Ready to scale your business? Get in touch for a free growth audit." />
      

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Get Your Free Growth Audit</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">Fill out the form and our team will analyze your current digital marketing performance and identify key growth opportunities completely free.

              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">Email Us</div>
                    <a href="mailto:business@nexbuildlabs.com" className="text-sm text-accent hover:underline">business@nexbuildlabs.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Send className="text-accent" size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">Book a Call</div>
                    <p className="text-sm text-muted-foreground">Schedule a free 30-min strategy session</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.1}>
              <form onSubmit={handleSubmit} className="bg-secondary border border-border rounded-2xl p-8 space-y-5">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    value={form.contact_person}
                    onChange={e => setForm({ ...form, contact_person: e.target.value })}
                    pattern="^[A-Za-z\s.'-]+$"
                    title="Use letters only (spaces and . ' - are allowed)."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Your phone number"
                    required
                    value={form.phone_number}
                    onChange={e => setForm({ ...form, phone_number: e.target.value })}
                    pattern="^[0-9+()\-\s]{7,20}$"
                    title="Enter a valid phone number."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Email</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                    title="Enter a valid email address."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Company Name</label>
                  <input
                    type="text"
                    placeholder="Your company name"
                    required
                    value={form.company_name}
                    onChange={e => setForm({ ...form, company_name: e.target.value })}
                    pattern="^[A-Za-z0-9\s&.,'-]+$"
                    title="Use letters and numbers only (basic symbols like & . , ' - allowed)."
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Website</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    required
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                    pattern="https?://.+"
                    title="Enter a valid URL starting with http:// or https://"
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Services Needed (Multi Select)</label>
                  <details className="group">
                    <summary className="list-none w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm cursor-pointer flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-ring transition-shadow">
                      <span className="truncate pr-3">{selectedServicesText}</span>
                      <ChevronDown size={16} className="shrink-0 transition-transform group-open:rotate-180" />
                    </summary>

                    <div
                      ref={servicesScrollRef}
                      onWheelCapture={handleServicesWheel}
                      onWheel={handleServicesWheel}
                      className="mt-2 border border-border rounded-lg bg-background p-3 max-h-56 overflow-y-auto overscroll-contain space-y-2"
                    >
                      {SERVICE_OPTIONS.map((service) => (
                        <label key={service} className="flex items-center gap-2 text-sm cursor-pointer">
                          <input
                            type="checkbox"
                            checked={form.service_needed.includes(service)}
                            onChange={() => toggleService(service)}
                            className="h-4 w-4 rounded border-border"
                          />
                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                  </details>
                  <p className="text-xs text-muted-foreground mt-1">Choose all services you need.</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Notes</label>
                  <textarea
                    placeholder="Tell us more..."
                    rows={3}
                    value={form.notes}
                    onChange={e => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Budget</label>
                  <div className="grid grid-cols-3 gap-3">
                    <select
                      title="Budget Currency"
                      value={form.budget_currency}
                      onChange={e => setForm({ ...form, budget_currency: e.target.value })}
                      className="col-span-1 bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="INR">INR (Rs)</option>
                    </select>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      required
                      placeholder="Amount"
                      value={form.budget_amount}
                      onChange={e => setForm({ ...form, budget_amount: e.target.value })}
                      className="col-span-2 bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-accent-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50">
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Submit Audit Request <ArrowRight size={16} /></>}
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>);

};

export default Contact;