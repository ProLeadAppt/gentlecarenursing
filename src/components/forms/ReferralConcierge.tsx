"use client";

import { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, UserPlus, Building2, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm, WebsiteSubmissionError } from "@/lib/form-client";
import { clearFieldValidation, reportFormValidity, fieldValidationMessage } from "@/lib/form-validation";

import { SITE } from "@/lib/constants";

type Step = 1 | 2 | 3 | 4;

const EMPTY_FORM_DATA = {
    referrerName: "",
    referrerEmail: "",
    referrerPhone: "",
    referrerRole: "",
    organization: "",
    clientName: "",
    serviceType: "",
    notes: "",
};

export function ReferralConcierge({ active = true, onRetainSessionChange }: { active?: boolean; onRetainSessionChange?: (retain: boolean) => void }) {
  const idPrefix = useId();
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const transitioningRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const focusStepRef = useRef(false);
  const invalidFieldRef = useRef<string | null>(null);
  const [outcome, setOutcome] = useState<"idle" | "success" | "rejected" | "uncertain">("idle");
  const submissionLockedRef = useRef(false);
  const outcomeRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  useEffect(() => {
    // The modal retains this form when closed; hidden results must not steal focus.
    if (active && (isSubmitting || outcome !== "idle")) outcomeRef.current?.focus();
  }, [active, isSubmitting, outcome]);

  const [formData, setFormData] = useState(EMPTY_FORM_DATA);
  const [detailsCleared, setDetailsCleared] = useState(false);
  const [wasActive, setWasActive] = useState(active);
  // Dismissal discards patient details. Keep only the delivery status and lock
  // so reopening cannot accidentally resend an accepted or unknown attempt.
  if (wasActive !== active) {
    setWasActive(active);
    if (!active) {
      setFormData(EMPTY_FORM_DATA);
      setDetailsCleared(true);
    }
  }

  const nextStep = () => {
    if (submittingRef.current || transitioningRef.current || step >= 4 || !formRef.current || !reportFormValidity(formRef.current)) return;
    transitioningRef.current = true;
    setIsTransitioning(true);
    focusStepRef.current = true;
    invalidFieldRef.current = null;
    setDirection(1);
    setStep((prev) => (prev + 1) as Step);
  };

  const prevStep = () => {
    if (submittingRef.current || transitioningRef.current || step <= 1) return;
    transitioningRef.current = true;
    setIsTransitioning(true);
    focusStepRef.current = true;
    invalidFieldRef.current = null;
    setDirection(-1);
    setStep((prev) => (prev - 1) as Step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetailsCleared(false);
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Animated steps unmount their controls. Recheck stored values before delivery.
  const validationFields: Array<{
    name: keyof typeof formData;
    step: Step;
    required?: boolean;
    type?: string;
    maxLength: number;
  }> = [
    { name: "referrerName", step: 1, required: true, maxLength: 254 },
    { name: "referrerRole", step: 1, required: true, maxLength: 254 },
    { name: "organization", step: 1, maxLength: 254 },
    { name: "referrerEmail", step: 2, required: true, type: "email", maxLength: 254 },
    { name: "referrerPhone", step: 2, required: true, maxLength: 254 },
    { name: "clientName", step: 3, required: true, maxLength: 254 },
    { name: "serviceType", step: 3, required: true, maxLength: 254 },
    { name: "notes", step: 4, maxLength: 5000 },
  ];

  function focusCurrentStep(definition: unknown) {
    // Exiting panels retain stale closures; only the entering panel may unlock/focus.
    if (definition !== "center") return;
    transitioningRef.current = false;
    setIsTransitioning(false);
  }

  useEffect(() => {
    if (!active || isTransitioning || !focusStepRef.current || !formRef.current) return;
    const panel = formRef.current.querySelector(`[data-form-step="${step}"]`);
    if (!panel) return;
    const fields = Array.from(panel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const target = fields.find(field => field.name === invalidFieldRef.current) ?? fields[0];
    if (invalidFieldRef.current) reportFormValidity(formRef.current);
    target?.focus();
    invalidFieldRef.current = null;
    focusStepRef.current = false;
  }, [active, step, isTransitioning]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!active || submissionLockedRef.current || submittingRef.current || transitioningRef.current) return;
    if (step < 4) {
      nextStep();
      return;
    }
    const invalid = validationFields.find(field => fieldValidationMessage(formData[field.name], field));
    if (invalid) {
      if (invalid.step === step) reportFormValidity(e.currentTarget);
      else {
        transitioningRef.current = true;
        setIsTransitioning(true);
        invalidFieldRef.current = invalid.name;
        focusStepRef.current = true;
        setDirection(-1);
        setStep(invalid.step);
      }
      return;
    }
    if (!reportFormValidity(e.currentTarget)) return;
    submittingRef.current = true;
    submissionLockedRef.current = true;
    onRetainSessionChange?.(true);
    setOutcome("idle");
    setIsSubmitting(true);
    
    try {
      const { submissionId } = await submitWebsiteForm({ type: "referral", ...formData });
      dispatchAnalyticsEvent("referral_submit", {
        form_type: "referral",
        service_type: formData.serviceType,
        cta_location: "referral_concierge",
        submission_id: submissionId,
      });
      if (mountedRef.current) {
        // Keep the receipt outcome across dismissal, not the accepted patient details.
        setFormData(EMPTY_FORM_DATA);
        setOutcome("success");
      }
    } catch (error) {
      dispatchAnalyticsEvent("form_error", {
        form_type: "referral",
        cta_location: "referral_concierge",
        error_type: "delivery",
      });
      const rejected = error instanceof WebsiteSubmissionError && error.outcome === "rejected";
      // Only a confirmed pre-send rejection allows a deliberate retry.
      // Unknown outcomes keep the details and lock submission across modal closes.
      submissionLockedRef.current = !rejected;
      if (mountedRef.current) {
        onRetainSessionChange?.(!rejected);
        setOutcome(rejected ? "rejected" : "uncertain");
      }
    } finally {
      submittingRef.current = false;
      if (mountedRef.current) setIsSubmitting(false);
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

  if (outcome === "success") {
    return (
      <div
        ref={outcomeRef}
        data-form-outcome
        tabIndex={-1}
        role="status"
        aria-atomic="true"
        aria-labelledby={`referral-success-${idPrefix}`}
        className="flex flex-col items-center justify-center py-12 text-center px-4 focus-visible:outline-2 focus-visible:outline-primary"
      >
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent ring-4 ring-accent/5">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 id={`referral-success-${idPrefix}`} className="font-[family-name:var(--font-serif)] text-3xl font-bold text-foreground">
          Referral accepted for delivery
        </h3>
        <p className="mt-4 max-w-sm text-lg text-muted-foreground leading-relaxed">
          Thank you. Your referral email has been accepted for delivery. This does not confirm inbox receipt, clinical acceptance, a booking or service availability.
        </p>
        <p className="mt-4 max-w-sm text-sm text-muted-foreground">
          Need to check on your referral? Please <a href={SITE.phoneHref} className="underline underline-offset-2">call {SITE.phone}</a> before submitting it again.
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

      <form ref={formRef} onSubmit={handleSubmit} onInput={clearFieldValidation} aria-busy={isSubmitting}>
        <fieldset disabled={isSubmitting || isTransitioning || outcome === "uncertain"} className="min-w-0">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              data-form-step={step}
              onAnimationComplete={focusCurrentStep}
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
                    <FormField label="Full Name" htmlFor={`ref-name-${idPrefix}`} required>
                      <Input id={`ref-name-${idPrefix}`} name="referrerName" value={formData.referrerName} onChange={handleInputChange} placeholder="e.g. Sarah Jennings" required />
                    </FormField>
                    <div className="grid grid-cols-2 gap-4">
                      <FormField label="Professional Role" htmlFor={`ref-role-${idPrefix}`} required>
                        <Select id={`ref-role-${idPrefix}`} name="referrerRole" value={formData.referrerRole} onChange={handleInputChange} required>
                          <option value="">Select Role...</option>
                          <option value="SC">Support Coordinator</option>
                          <option value="DP">Discharge Planner</option>
                          <option value="GP">General Practitioner</option>
                          <option value="OT">Occupational Therapist</option>
                          <option value="Family">Family Member</option>
                          <option value="Other">Other Professional</option>
                        </Select>
                      </FormField>
                      <FormField label="Organisation" htmlFor={`ref-org-${idPrefix}`}>
                        <Input id={`ref-org-${idPrefix}`} name="organization" value={formData.organization} onChange={handleInputChange} placeholder="e.g. Royal Prince Alfred" />
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
                    <FormField label="Email Address" htmlFor={`ref-email-${idPrefix}`} required>
                      <Input id={`ref-email-${idPrefix}`} name="referrerEmail" type="email" value={formData.referrerEmail} onChange={handleInputChange} placeholder="professional@email.com" required />
                    </FormField>
                    <FormField label="Phone Number" htmlFor={`ref-phone-${idPrefix}`} required>
                      <Input id={`ref-phone-${idPrefix}`} name="referrerPhone" type="tel" value={formData.referrerPhone} onChange={handleInputChange} placeholder="Best contact number" required />
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
                    <FormField label="Client Full Name (or Initials)" htmlFor={`client-name-${idPrefix}`} required>
                      <Input id={`client-name-${idPrefix}`} name="clientName" value={formData.clientName} onChange={handleInputChange} placeholder="For privacy, initials are fine" required />
                    </FormField>
                    <FormField label="Required Service" htmlFor={`ref-service-${idPrefix}`} required>
                      <Select id={`ref-service-${idPrefix}`} name="serviceType" value={formData.serviceType} onChange={handleInputChange} required>
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
                    <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold">Nursing Notes</h3>
                    <p className="text-muted-foreground">Any specific clinical requirements or urgency we should know about?</p>
                  </div>
                  <FormField label="Additional Notes" htmlFor={`ref-notes-${idPrefix}`}>
                    <Textarea 
                      id={`ref-notes-${idPrefix}`}
                      name="notes" 
                      value={formData.notes} 
                      onChange={handleInputChange} 
                      placeholder="Briefly describe the clinical situation or specific goals..."
                      rows={6}
                    />
                  </FormField>
                  <p className="text-xs text-muted-foreground italic">
                    Note: A nursing lead will follow up for more details.
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
        </fieldset>
        {(isSubmitting || outcome === "rejected" || outcome === "uncertain") && (
          <div
            ref={outcomeRef}
            data-form-outcome
            tabIndex={-1}
            role={isSubmitting ? "status" : "alert"}
            aria-atomic="true"
            className="mt-6 rounded-xl border border-primary/30 bg-primary/5 p-5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-primary"
          >
            {isSubmitting ? (
              <p>Sending your referral. Closing this window clears the entered details but does not cancel the request.</p>
            ) : (
              <>
                <p>{outcome === "rejected"
                  ? "Your referral was not sent. Please check your details and try again, or contact us."
                  : "We couldn’t confirm whether your referral was accepted for delivery. It may already have reached our team. Please contact us before submitting again to avoid a duplicate referral."}</p>
                <p className="mt-3">{detailsCleared ? "Your entered details have been cleared from this window." : "Your details are still here. Closing this window clears them."}</p>
                <p className="mt-3"><a href={SITE.phoneHref} className="font-semibold underline underline-offset-2">Call {SITE.phone}</a> or <a href={`mailto:${SITE.email}`} className="underline underline-offset-2">email {SITE.email}</a>.</p>
              </>
            )}
          </div>
        )}
      </form>
    </div>
  );
}
