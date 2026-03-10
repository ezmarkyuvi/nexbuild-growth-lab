import { useState } from "react";
import { ArrowRight, Mail, Send, MessageCircle, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import DarkHero from "@/components/DarkHero";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", website: "", goals: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: form,
      });
      if (error) throw error;
      toast.success("Thank you! We'll be in touch within 24 hours.");
      setForm({ name: "", email: "", company: "", website: "", goals: "" });
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
        subtitle="Ready to scale your business? Get in touch for a free growth audit."
      />

      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto bg-card border border-border rounded-3xl p-8 md:p-12 shadow-card hover:shadow-card-hover hover:border-accent/20 hover:-translate-y-1 transition-all duration-300">
            <AnimatedSection>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6">Get Your Free Growth Audit</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Fill out the form and our team will analyze your current digital marketing performance and identify key growth opportunities — completely free.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="text-accent" size={18} />
                  </div>
                  <div>
                    <div className="font-heading font-semibold text-sm">Email Us</div>
                    <a href="mailto:contact.nexbuildlabs@gmail.com" className="text-sm text-accent hover:underline">contact.nexbuildlabs@gmail.com</a>
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
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your full name" },
                  { label: "Email", key: "email", type: "email", placeholder: "you@company.com" },
                  { label: "Company", key: "company", type: "text", placeholder: "Your company name" },
                  { label: "Website", key: "website", type: "url", placeholder: "https://yoursite.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="block text-sm font-medium mb-1.5">{field.label}</label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.key === "name" || field.key === "email"}
                      value={form[field.key as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-sm font-medium mb-1.5">Marketing Goals</label>
                  <textarea
                    placeholder="Tell us about your growth goals..."
                    rows={4}
                    value={form.goals}
                    onChange={(e) => setForm({ ...form, goals: e.target.value })}
                    className="w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-primary text-accent-foreground py-3 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Submit Audit Request <ArrowRight size={16} /></>}
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
