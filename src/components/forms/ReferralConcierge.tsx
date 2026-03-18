"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, UserPlus, Building2, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type Step = 1 | 2 | 3 | 4;

export function ReferralConcierge() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referrerRole: "",
    organization: "",
    clientName: "",
    serviceType: "",
    notes: "",
  });

  const nextStep = () => {
    setDirection(1);
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((prev) => (prev - 1) as Step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "referral", ...formData }),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSuccess(true);
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center px-4">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-4 ring-accent/5">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-3xl font-bold text-foreground">
          Referral Submitted
        </h3>
        <p className="mt-4 max-w-sm text-lg text-muted-foreground leading-relaxed">
          Thank you for trusting us with your client. Our clinical leads will review the details and contact you within 24 hours to confirm the next steps.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden pt-4">
      {/* Premium Progress Indicator */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-4 px-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
            Step {step} of 4
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
            {Math.round((step / 4) * 100)}% Complete
          </span>
        </div>
        <div className="h-1.5 w-full bg-muted overflow-hidden rounded-full">
          <motion.div 
            className="h-full bg-accent"
            initial={{ width: "25%" }}
            animate={{ width: `${(step / 4) * 100}%` }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="min-h-[380px]"
          >
            {step === 1 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-2">
                    <UserPlus className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Your Professional Details</h3>
                  <p className="text-muted-foreground">Please tell us who is making this referral.</p>
                </div>
                <div className="grid gap-5">
                  <FormField label="Full Name" htmlFor="ref-name" required>
                    <Input id="ref-name" name="referrerName" value={formData.referrerName} onChange={handleInputChange} placeholder="e.g. Sarah Jennings" required />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Professional Role" htmlFor="ref-role" required>
                      <Select id="ref-role" name="referrerRole" value={formData.referrerRole} onChange={handleInputChange} required>
                        <option value="">Select Role...</option>
                        <option value="SC">Support Coordinator</option>
                        <option value="DP">Discharge Planner</option>
                        <option value="GP">General Practitioner</option>
                        <option value="OT">Occupational Therapist</option>
                        <option value="Family">Family Member</option>
                        <option value="Other">Other Professional</option>
                      </Select>
                    </FormField>
                    <FormField label="Organization" htmlFor="ref-org">
                      <Input id="ref-org" name="organization" value={formData.organization} onChange={handleInputChange} placeholder="e.g. Royal Prince Alfred" />
                    </FormField>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-2">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Contact Information</h3>
                  <p className="text-muted-foreground">Where can we reach you to discuss the referral?</p>
                </div>
                <div className="grid gap-5">
                  <FormField label="Email Address" htmlFor="ref-email" required>
                    <Input id="ref-email" name="referrerEmail" type="email" value={formData.referrerEmail} onChange={handleInputChange} placeholder="professional@email.com" required />
                  </FormField>
                  <FormField label="Phone Number" htmlFor="ref-phone" required>
                    <Input id="ref-phone" name="referrerPhone" type="tel" value={formData.referrerPhone} onChange={handleInputChange} placeholder="Best contact number" required />
                  </FormField>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-2">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Client Information</h3>
                  <p className="text-muted-foreground">Basic details about the person needing care.</p>
                </div>
                <div className="grid gap-5">
                  <FormField label="Client Full Name (or Initials)" htmlFor="client-name" required>
                    <Input id="client-name" name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="For privacy, initials are fine" required />
                  </FormField>
                  <FormField label="Required Service" htmlFor="ref-service" required>
                    <Select id="ref-service" name="serviceType" value={formData.serviceType} onChange={handleInputChange} required>
                      <option value="">Select Service...</option>
                      <option value="Nursing">General Nursing</option>
                      <option value="Complex">Complex Clinical Care</option>
                      <option value="Post-Op">Post-Op Recovery</option>
                      <option value="NDIS">NDIS Support</option>
                      <option value="AgedCare">Aged Care Support</option>
                      <option value="Other">Other Inquiry</option>
                    </Select>
                  </FormField>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div className="space-y-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-2">
                    <ClipboardCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Clinical Notes</h3>
                  <p className="text-muted-foreground">Any specific clinical requirements or urgency?</p>
                </div>
                <FormField label="Additional Notes" htmlFor="ref-notes">
                  <Textarea 
                    id="ref-notes"
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="Briefly describe the clinical situation or specific goals..."
                    rows={6}
                  />
                </FormField>
                <p className="text-xs text-muted-foreground italic">
                  Note: A clinical lead will follow up for detailed documentation.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-8">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} className="gap-2 px-6">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={
                (step === 1 && (!formData.referrerName || !formData.referrerRole)) || 
                (step === 2 && (!formData.referrerEmail || !formData.referrerPhone)) ||
                (step === 3 && (!formData.clientName || !formData.serviceType))
              }
              className="gap-2 px-8"
            >
              Next Step
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting} className="gap-2 px-10">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending Referral
                </>
              ) : (
                <>
                  Submit Referral
                  <Check className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
