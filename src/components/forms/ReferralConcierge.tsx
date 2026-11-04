"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, UserPlus, Building2, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm } from "@/lib/form-client";
import { EnquiryPrivacyNotice } from "./EnquiryPrivacyNotice";

type Step = 1 | 2 | 3 | 4;

export function ReferralConcierge() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const submittingRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    // New fields must replace old ones immediately so rapid clicks validate the
    // current step, and keyboard users land on the newly displayed controls.
    formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
  }, [step]);

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
    if (!formRef.current?.reportValidity()) return;
    setDirection(1);
    // Repeated clicks from the same render must not skip a step.
    setStep((prev) => prev === step ? Math.min(prev + 1, 4) as Step : prev);
  };

  const prevStep = () => {
    if (submittingRef.current) return;
    setErrorMessage("");
    setDirection(-1);
    setStep((prev) => prev === step ? Math.max(prev - 1, 1) as Step : prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Enter on an earlier step should advance, never submit a partial referral.
    if (step < 4) {
      nextStep();
      return;
    }
    if (submittingRef.current || !formRef.current?.reportValidity()) return;
    submittingRef.current = true;
    setErrorMessage("");
    setIsSubmitting(true);
    
    try {
      const { submissionId } = await submitWebsiteForm({ type: "referral", ...formData });
      dispatchAnalyticsEvent("referral_submit", {
        form_type: "referral",
        service_type: formData.serviceType,
        cta_location: "referral_concierge",
        submission_id: submissionId,
      });
      setIsSuccess(true);
    } catch {
      dispatchAnalyticsEvent("form_error", {
        form_type: "referral",
        cta_location: "referral_concierge",
        error_type: "delivery",
      });
      setErrorMessage("We could not confirm your referral was sent. Please try again or call 1300 004 267.");
    } finally {
      submittingRef.current = false;
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
      <div className="flex flex-col items-center justify-center py-12 text-center px-4" role="status">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-4 ring-accent/5">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-3xl font-bold text-foreground">
          Referral Submitted
        </h3>
        <p className="mt-4 max-w-sm text-lg text-muted-foreground leading-relaxed">
          Your referral has been accepted for delivery. Our team will review it and contact you about next steps.
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

      <form ref={formRef} onSubmit={handleSubmit} data-clarity-mask="true">
        <div className="mb-6"><EnquiryPrivacyNotice referral /></div>
        {/* Do not retain outgoing required fields during step transitions. */}
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
                    <Input id="ref-name" name="referrerName" autoComplete="name" maxLength={120} value={formData.referrerName} onChange={handleInputChange} placeholder="Your name" required />
                  </FormField>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField label="Your role" htmlFor="ref-role" required>
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
                    <FormField label="Organisation" htmlFor="ref-org">
                      <Input id="ref-org" name="organization" autoComplete="organization" maxLength={200} value={formData.organization} onChange={handleInputChange} placeholder="Your organisation (optional)" />
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
                    <Input id="ref-email" name="referrerEmail" type="email" autoComplete="email" maxLength={200} value={formData.referrerEmail} onChange={handleInputChange} placeholder="professional@email.com" required />
                  </FormField>
                  <FormField label="Phone Number" htmlFor="ref-phone" required>
                    <Input id="ref-phone" name="referrerPhone" type="tel" autoComplete="tel" maxLength={40} value={formData.referrerPhone} onChange={handleInputChange} placeholder="Best contact number" required />
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
                  <FormField label="Client initials (optional)" htmlFor="ref-client-initials">
                    <Input id="ref-client-initials" name="clientName" maxLength={120} value={formData.clientName} onChange={handleInputChange} placeholder="Initials are enough" />
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
                  <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Your Enquiry</h3>
                  <p className="text-muted-foreground">What would you like our team to contact you about? Please leave out detailed medical information.</p>
                </div>
                <FormField label="Additional Notes" htmlFor="ref-notes">
                  <Textarea 
                    id="ref-notes"
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="A brief enquiry is enough to start the conversation."
                    maxLength={2000}
                    rows={6}
                  />
                </FormField>
                <p className="text-xs text-muted-foreground italic">
                  Ask our team how to provide any further information needed for care.
                </p>
              </div>
            )}
          </motion.div>


        {errorMessage && <p className="mt-6 text-sm text-destructive" role="alert">{errorMessage}</p>}

        <div className="mt-12 flex items-center justify-between border-t border-border/60 pt-8">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} disabled={isSubmitting} className="gap-2 px-6">
              <ArrowLeft className="h-4 w-4" />
              Previous
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button 
              type="submit"
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
