import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Mail, Send, MessageCircle, Loader2, Upload } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedSection from "@/components/AnimatedSection";
import DarkHero from "@/components/DarkHero";
import HeroBackground from "@/components/HeroBackground";
import { toast } from "sonner";

const GOOGLE_SHEETS_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbwulK7LFD3id6Ml-8HsMAVygOeNa4kv5jqbbmbOt9lBvT5bdGCke2JmhDxk43-XFm_-8w/exec";

const PROJECT_OPTIONS = [
  "Business Website",
  "Web Application",
  "Landing Page",
  "E-Commerce",
  "Website Redesign",
  "Maintenance / Updates",
  "Other",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "2-4 weeks",
  "1-3 months",
  "Flexible / No rush",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  projectNeeds: string[];
  projectDescription: string;
  timeline: string;
  preferredCallDate: string;
  referenceWebsites: string;
  attachments: File[];
};

type FormErrors = {
  name?: string;
  email?: string;
  projectNeeds?: string;
  projectDescription?: string;
  attachments?: string;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const Contact = () => {
  const [form, setForm] = useState({
    company_name: "",
    contact_person: "",
    phone_number: "",
        name: "",
        email: "",
        phone: "",
        projectNeeds: [],
        projectDescription: "",
        timeline: "",
        preferredCallDate: "",
        referenceWebsites: "",
        attachments: [],
      } as FormState);
      const [errors, setErrors] = useState<FormErrors>({});
      const [step, setStep] = useState(1);
      const totalSteps = 3;
      const currentStep = Math.max(1, Math.min(step, totalSteps));
      const isLastStep = currentStep === totalSteps;
      const progress = useMemo(() => [1, 2, 3], []);
      const minCallDate = useMemo(() => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, "0");
        const day = String(now.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      }, []);

      const [isSubmitting, setIsSubmitting] = useState(false);

      const toggleProjectNeed = (option: string) => {
        setForm((prev) => ({
          ...prev,
          projectNeeds: prev.projectNeeds.includes(option)
            ? prev.projectNeeds.filter((item) => item !== option)
            : [...prev.projectNeeds, option],
        }));
        setErrors((prev) => ({ ...prev, projectNeeds: undefined }));
      };

      const selectTimeline = (option: string) => {
        setForm((prev) => ({ ...prev, timeline: option }));
      };

      const handleAttachments = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);

        if (files.length === 0) {
          return;
        }

        if (files.length > 5) {
          setErrors((prev) => ({ ...prev, attachments: "You can upload up to 5 files." }));
          return;
        }

        const hasLargeFile = files.some((file) => file.size > 10 * 1024 * 1024);
        if (hasLargeFile) {
          setErrors((prev) => ({ ...prev, attachments: "Each file must be 10MB or smaller." }));
          return;
        }

        setErrors((prev) => ({ ...prev, attachments: undefined }));
        setForm((prev) => ({ ...prev, attachments: files }));
      };

      const validateStep = (stepToValidate: number) => {
        const nextErrors: FormErrors = {};

        if (stepToValidate === 1) {
          if (!form.name.trim()) {
            nextErrors.name = "Name is required";
          }
          if (!form.email.trim()) {
            nextErrors.email = "Valid email required";
          } else if (!isValidEmail(form.email.trim())) {
            nextErrors.email = "Please enter a valid email";
          }
        }

        if (stepToValidate === 2) {
          if (form.projectNeeds.length === 0) {
            nextErrors.projectNeeds = "Please select at least one option";
          }
          if (!form.projectDescription.trim()) {
            nextErrors.projectDescription = "Project description is required";
          }
        }

        setErrors((prev) => ({ ...prev, ...nextErrors }));
        return Object.keys(nextErrors).length === 0;
      };

      const goToNextStep = () => {
        if (!validateStep(currentStep)) {
          return;
        }
        setStep((prev) => Math.min(prev + 1, totalSteps));
      };

      const goToPrevStep = () => {
        setStep((prev) => Math.max(prev - 1, 1));
      };

      const handleSubmit = async () => {
        if (!isLastStep || isSubmitting) {
          return;
        }

        const step1Ok = validateStep(1);
        const step2Ok = validateStep(2);

        if (!step1Ok) {
          setStep(1);
          return;
        }
        if (!step2Ok) {
          setStep(2);
          return;
        }

        const references = form.referenceWebsites
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);

        setIsSubmitting(true);
        try {
          const payload = {
            company_name: "",
            contact_person: form.name,
            phone_number: form.phone,
            email: form.email,
            website: references[0] ?? "",
            service_needed: form.projectNeeds.join(", "),
            notes: [
              `Project Details: ${form.projectDescription}`,
              `Timeline: ${form.timeline || "Not specified"}`,
              `Preferred Call Date: ${form.preferredCallDate || "Not specified"}`,
              `Reference Websites: ${references.join(", ") || "None"}`,
              `Attachments: ${form.attachments.map((f) => f.name).join(", ") || "None"}`,
            ].join("\n"),
            budget: "",
          };

          await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
            method: "POST",
            mode: "no-cors",
            headers: { "Content-Type": "text/plain;charset=utf-8" },
            body: JSON.stringify(payload),
          });
          toast.success("Thank you! We'll be in touch within 24 hours.");
          setForm({
            name: "",
            email: "",
            phone: "",
            projectNeeds: [],
            projectDescription: "",
            timeline: "",
            preferredCallDate: "",
            referenceWebsites: "",
            attachments: [],
          });
          setErrors({});
          setStep(1);
        } catch (err) {
          console.error("Submit error:", err);
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

          <section className="relative overflow-hidden py-24">
            <HeroBackground opacity={0.55} withOrbs={false} />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_85%,rgba(234,120,28,0.10),transparent_42%)]" />
            <div className="container relative z-10 mx-auto px-4 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <AnimatedSection>
                  {/* Professional Two-Tone Contact Box */}
                  <div className="relative overflow-hidden rounded-[34px] shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      
                      {/* Left Side - Dark Panel with Contact Details */}
                      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-8 md:px-12 py-12 md:py-16 flex flex-col justify-center">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl"></div>
                          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/50 rounded-full mix-blend-screen filter blur-3xl"></div>
                        </div>

                        <div className="relative z-10 space-y-8">
                          <div>
                            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                              Get In <span className="text-accent">Touch</span>
                            </h2>
                            <p className="text-lg text-gray-300 leading-relaxed">
                              Ready to scale your business? Reach out and let's discuss how we can help you achieve your growth goals.
                            </p>
                          </div>

                          <div className="space-y-4">
                            {/* Email Card */}
                            <motion.a
                              href="mailto:business@nexbuildlabs.com"
                              whileHover={{ x: 8 }}
                              className="block group"
                            >
                              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 transition-all duration-300 hover:bg-white/15 hover:border-accent/50">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-accent transition-opacity duration-300" />
                                <div className="relative z-10 space-y-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                      <Mail className="text-accent" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Email Us</h3>
                                  </div>
                                  <p className="text-base text-accent font-semibold pl-15">business@nexbuildlabs.com</p>
                                  <p className="text-sm text-gray-300 pl-15">We respond within 24 hours</p>
                                </div>
                              </div>
                            </motion.a>

                            {/* Call Card */}
                            <motion.div
                              whileHover={{ x: 8 }}
                              className="group cursor-pointer"
                            >
                              <div className="relative overflow-hidden rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 transition-all duration-300 hover:bg-white/15 hover:border-accent/50">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-40 bg-accent transition-opacity duration-300" />
                                <div className="relative z-10 space-y-2">
                                  <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                                      <Send className="text-accent" size={24} />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white">Book a Call</h3>
                                  </div>
                                  <p className="text-base text-accent font-semibold pl-15">Schedule a Strategy Session</p>
                                  <p className="text-sm text-gray-300 pl-15">Free 30-minute consultation</p>
                                </div>
                              </div>
                            </motion.div>
                          </div>

                          {/* Features List */}
                          <div className="space-y-3 pt-6">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                              <p className="text-gray-300">Quick response time</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                              <p className="text-gray-300">Expert consultation</p>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                                <div className="w-2 h-2 rounded-full bg-white" />
                              </div>
                              <p className="text-gray-300">Personalized solutions</p>
                            </div>
                          </div>
                        </div>
                      </div>


                      {/* Right Side - Light Panel with Form */}
                      <div className="relative bg-white px-8 md:px-12 py-12 md:py-16">
                        <form onSubmit={(e) => e.preventDefault()} className="relative z-10 space-y-10">
                      <div className="flex items-center w-full px-2">
                        {progress.map((item, idx) => {
                          const isActive = currentStep >= item;
                          const isCompleted = currentStep > item;
                          return (
                            <div key={item} className={`flex items-center ${idx < progress.length - 1 ? "flex-1" : ""}`}>
                              <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2 transition-all duration-300 shrink-0 ${
                                  isActive
                                    ? "bg-accent text-white border-accent shadow-lg"
                                    : "bg-gray-100 text-gray-400 border-gray-300"
                                }`}
                              >
                                {item}
                              </div>
                              {idx < progress.length - 1 && (
                                <div className="mx-3 h-1 flex-1 rounded-full bg-gray-200 overflow-hidden">
                                  <div
                                    className={`h-full rounded-full bg-accent transition-all duration-300 ${
                                      isCompleted ? "w-full" : "w-0"
                                    }`}
                                  />
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {currentStep === 1 && (
                        <div className="space-y-7 pt-4">
                          <h2 className="text-3xl font-heading font-bold text-foreground">About You</h2>

                          <div>
                            <label className="block text-lg font-semibold mb-3 text-[#ff5a5f]">Your Name *</label>
                            <input
                              type="text"
                              placeholder="Your full name"
                              value={form.name}
                              onChange={(e) => {
                                setForm((prev) => ({ ...prev, name: e.target.value }));
                                setErrors((prev) => ({ ...prev, name: undefined }));
                              }}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                            {errors.name && <p className="text-destructive text-sm mt-2">{errors.name}</p>}
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-3 text-[#ff5a5f]">Email Address *</label>
                            <input
                              type="email"
                              placeholder="you@example.com"
                              value={form.email}
                              onChange={(e) => {
                                setForm((prev) => ({ ...prev, email: e.target.value }));
                                setErrors((prev) => ({ ...prev, email: undefined }));
                              }}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                            {errors.email && <p className="text-destructive text-sm mt-2">{errors.email}</p>}
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-3 text-foreground">Phone Number</label>
                            <input
                              type="tel"
                              placeholder="Your phone number"
                              value={form.phone}
                              onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))}
                              className="w-full bg-gray-50 border-2 border-accent/40 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all"
                            />
                          </div>
                        </div>
                      )}

                      {currentStep === 2 && (
                        <div className="space-y-7 pt-4">
                          <h2 className="text-3xl font-heading font-bold text-foreground">Your Project</h2>

                          <div>
                            <label className="block text-lg font-semibold mb-4">What do you need? *</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {PROJECT_OPTIONS.map((option) => {
                                const isSelected = form.projectNeeds.includes(option);
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => toggleProjectNeed(option)}
                                    className={`text-left rounded-2xl border-2 px-5 py-3 text-base font-medium transition-all ${
                                      isSelected
                                        ? "border-accent bg-accent/15 text-accent"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-accent/50"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                            {errors.projectNeeds && <p className="text-destructive text-sm mt-2">{errors.projectNeeds}</p>}
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-3">Describe your project *</label>
                            <textarea
                              placeholder="Tell me what you're looking for..."
                              rows={6}
                              value={form.projectDescription}
                              onChange={(e) => {
                                setForm((prev) => ({ ...prev, projectDescription: e.target.value }));
                                setErrors((prev) => ({ ...prev, projectDescription: undefined }));
                              }}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                            />
                            {errors.projectDescription && (
                              <p className="text-destructive text-sm mt-2">{errors.projectDescription}</p>
                            )}
                          </div>
                        </div>
                      )}

                      {currentStep === 3 && (
                        <div className="space-y-7 pt-4">
                          <h2 className="text-3xl font-heading font-bold text-foreground">A Few More Details</h2>

                          <div>
                            <label className="block text-lg font-semibold mb-4">Timeline</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {TIMELINE_OPTIONS.map((option) => {
                                const isSelected = form.timeline === option;
                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => selectTimeline(option)}
                                    className={`text-left rounded-2xl border-2 px-5 py-3 text-base font-medium transition-all ${
                                      isSelected
                                        ? "border-accent bg-accent/15 text-accent"
                                        : "border-gray-200 bg-white text-gray-700 hover:border-accent/50"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-3">Preferred call date (optional)</label>
                            <input
                              type="date"
                              min={minCallDate}
                              value={form.preferredCallDate}
                              onChange={(e) => setForm((prev) => ({ ...prev, preferredCallDate: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                            <p className="text-gray-600 mt-2 text-sm">Pick the date you'd like us to call you.</p>
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-3">Reference websites (optional)</label>
                            <input
                              type="text"
                              placeholder="https://example.com, https://another.com"
                              value={form.referenceWebsites}
                              onChange={(e) => setForm((prev) => ({ ...prev, referenceWebsites: e.target.value }))}
                              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-lg placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                            />
                          </div>

                          <div>
                            <label className="block text-lg font-semibold mb-2">Attachments (optional)</label>
                            <p className="text-gray-600 mt-2 mb-4 text-sm">
                              Upload logos, mockups, documents. Max 5 files, 10MB each. (PDF, DOC, PNG, JPG)
                            </p>
                            <label className="block w-full border border-dashed border-gray-300 rounded-2xl p-8 text-center bg-gray-50 hover:border-accent/60 cursor-pointer transition-colors">
                              <input
                                type="file"
                                accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                multiple
                                className="hidden"
                                onChange={handleAttachments}
                              />
                              <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                              <p className="text-gray-600 text-base">Click to upload files</p>
                            </label>
                            {form.attachments.length > 0 && (
                              <p className="text-sm text-gray-600 mt-3">
                                {form.attachments.map((file) => file.name).join(", ")}
                              </p>
                            )}
                            {errors.attachments && <p className="text-destructive text-sm mt-2">{errors.attachments}</p>}
                          </div>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-10">
                        {currentStep > 1 ? (
                          <button
                            type="button"
                            onClick={goToPrevStep}
                            className="inline-flex items-center gap-2 text-foreground text-lg font-semibold px-4 py-2.5 hover:opacity-70 transition-opacity"
                          >
                            <ArrowLeft size={20} />
                            Back
                          </button>
                        ) : (
                          <div />
                        )}

                        {!isLastStep ? (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={goToNextStep}
                            className="bg-gradient-primary text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                          >
                            Next
                            <ArrowRight size={20} />
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.97 }}
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-gradient-primary text-white px-8 py-3 rounded-full text-lg font-semibold inline-flex items-center gap-2 shadow-md hover:shadow-lg transition-shadow disabled:opacity-60"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 size={20} className="animate-spin" />
                                Submitting...
                              </>
                            ) : (
                              <>
                                Submit Project
                                <ArrowRight size={20} />
                              </>
                            )}
                          </motion.button>
                        )}
                      </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </section>
        </div>
      );
    };

    export default Contact;
