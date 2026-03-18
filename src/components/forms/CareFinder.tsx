"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

type Step = 1 | 2 | 3 | 4;

export function CareFinder() {
  const [step, setStep] = useState<Step>(1);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    seekingFor: "",
    serviceType: "",
    name: "",
    phone: "",
    email: "",
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
    
    // Simulate API call
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "care-finder", ...formData }),
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
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/20 text-accent">
          <Check className="h-8 w-8" strokeWidth={3} />
        </div>
        <h3 className="font-[family-name:var(--font-serif)] text-2xl font-bold text-foreground">
          We&apos;ve Received Your Request
        </h3>
        <p className="mt-4 max-w-sm text-muted-foreground">
          Gemma or one of our nursing leads will review your details and reach out within 24 hours to talk about how we can help.
        </p>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      {/* Progress Line */}
      <div className="mb-8 flex h-1 w-full bg-muted overflow-hidden rounded-full">
        <motion.div 
          className="h-full bg-accent"
          initial={{ width: "25%" }}
          animate={{ width: `${(step / 4) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
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
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="min-h-[320px]"
          >
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold">Who are you seeking care for?</h3>
                  <p className="text-sm text-muted-foreground">This helps us tailor our conversation.</p>
                </div>
                <FormField label="Relation" htmlFor="seeking-for" required>
                  <Select id="seeking-for" name="seekingFor" value={formData.seekingFor} onChange={handleInputChange} required>
                    <option value="">Select an option...</option>
                    <option value="myself">Myself</option>
                    <option value="parent">A Parent</option>
                    <option value="partner">A Partner / Spouse</option>
                    <option value="client">A Client (I am a Coordinator)</option>
                    <option value="other">Other</option>
                  </Select>
                </FormField>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold">What type of support is needed?</h3>
                  <p className="text-sm text-muted-foreground">Select the primary area of care.</p>
                </div>
                <FormField label="Service Type" htmlFor="service-type" required>
                  <Select id="service-type" name="serviceType" value={formData.serviceType} onChange={handleInputChange} required>
                    <option value="">Select a category...</option>
                    <option value="clinical">Clinical / Skilled Nursing</option>
                    <option value="aged-care">Aged Care Support</option>
                    <option value="ndis">NDIS Nursing</option>
                    <option value="post-hospital">Post-Hospital Recovery</option>
                    <option value="palliative">Palliative Care</option>
                  </Select>
                </FormField>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold">Your Details</h3>
                  <p className="text-sm text-muted-foreground">How can we reach you?</p>
                </div>
                <div className="grid gap-4">
                  <FormField label="Your Name" htmlFor="finder-name" required>
                    <Input id="finder-name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Full Name" required />
                  </FormField>
                  <FormField label="Phone Number" htmlFor="finder-phone" required>
                    <Input id="finder-phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="Phone" required />
                  </FormField>
                  <FormField label="Email" htmlFor="finder-email" required>
                    <Input id="finder-email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="email@address.com" required />
                  </FormField>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-[family-name:var(--font-serif)] text-xl font-bold">Almost there...</h3>
                  <p className="text-sm text-muted-foreground">Any specific notes or urgent requirements?</p>
                </div>
                <FormField label="Additional Information" htmlFor="finder-notes">
                  <Textarea 
                    id="finder-notes"
                    name="notes" 
                    value={formData.notes} 
                    onChange={handleInputChange} 
                    placeholder="Tell us a bit more about the situation..."
                    rows={4}
                  />
                </FormField>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
          {step > 1 ? (
            <Button type="button" variant="ghost" onClick={prevStep} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <Button 
              type="button" 
              onClick={nextStep} 
              disabled={
                (step === 1 && !formData.seekingFor) || 
                (step === 2 && !formData.serviceType)
              }
              className="gap-2"
            >
              Continue
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting || !formData.name || !formData.phone} className="gap-2">
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting
                </>
              ) : (
                <>
                  Send Request
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
