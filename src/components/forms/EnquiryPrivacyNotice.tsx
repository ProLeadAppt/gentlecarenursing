import Link from "next/link";

/** Initial-enquiry guidance, not a substitute for the owner's collection policy. */
export function EnquiryPrivacyNotice({ referral = false }: { referral?: boolean }) {
  return (
    <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
      <p>
        Include only what we need to respond to your initial enquiry. Please do
        not include medical records, detailed clinical information or identity
        document numbers in this form.
      </p>
      {referral && (
        <p>
          If you are referring someone else, make sure you have their permission
          or authority to share their details. Initials are enough at this stage.
        </p>
      )}
      <p>
        Read our <Link href="/privacy" className="font-medium text-primary underline underline-offset-2">privacy policy</Link>.
        {" "}For a medical emergency, call <a href="tel:000" className="font-medium text-primary underline underline-offset-2">000</a>.
        Do not wait for a response to this form.
      </p>
    </div>
  );
}
