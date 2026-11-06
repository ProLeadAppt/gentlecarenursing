"use client";

import { useState, useRef, useId, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2, UserPlus, Building2, ClipboardCheck } from "lucide-react";
import { ReferralOutcome } from "./ReferralOutcome";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { dispatchAnalyticsEvent } from "@/lib/analytics";
import { submitWebsiteForm } from "@/lib/form-client";
import { clearFieldValidation, reportFormValidity, fieldValidationMessage } from "@/lib/form-validation";

type Step = 1 | 2 | 3 | 4;

export function ReferralConcierge() {
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
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasSubmissionError, setHasSubmissionError] = useState(false);
  const outcomeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess || (hasSubmissionError && !isSubmitting)) outcomeRef.current?.focus();
  }, [isSuccess, hasSubmissionError, isSubmitting]);

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
    if (isTransitioning || !focusStepRef.current || !formRef.current) return;
    const panel = formRef.current.querySelector(`[data-form-step="${step}"]`);
    if (!panel) return;
    const fields = Array.from(panel.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("input, select, textarea"));
    const target = fields.find(field => field.name === invalidFieldRef.current) ?? fields[0];
    if (invalidFieldRef.current) reportFormValidity(formRef.current);
    target?.focus();
    invalidFieldRef.current = null;
    focusStepRef.current = false;
  }, [step, isTransitioning]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submittingRef.current || transitioningRef.current) return;
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
    setIsSubmitting(true);
    setHasSubmissionError(false);
    
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
      setHasSubmissionError(true);
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
    return <ReferralOutcome success noticeRef={outcomeRef} />;
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
        <fieldset disabled={isSubmitting || isTransitioning} className="min-w-0">
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

          {hasSubmissionError && <ReferralOutcome success={false} noticeRef={outcomeRef} />}

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
      </form>
    </div>
  );
}
