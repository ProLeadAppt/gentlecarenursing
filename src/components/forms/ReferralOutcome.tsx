import type { Ref } from "react";

/** No enquiry data or provider errors are exposed in submission notices. */
export function ReferralOutcome({ success, noticeRef }: { success: boolean; noticeRef?: Ref<HTMLDivElement> }) {
  return (
    <div
      ref={noticeRef}
      tabIndex={-1}
      role={success ? "status" : "alert"}
      className={success
        ? "rounded-lg border border-accent/30 bg-accent/5 p-6 text-center focus:outline-none focus:ring-2 focus:ring-primary"
        : "mt-6 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary"}
    >
      <h3 className="text-lg font-semibold text-foreground">
        {success ? "Referral accepted for delivery" : "We couldn’t confirm your referral"}
      </h3>
      <p className="mt-2 text-muted-foreground">
        {success
          ? "Your referral has been accepted for delivery to our team. This does not confirm a booking or the start of care."
          : "Your details are still in this form. Delivery may have occurred, so please contact us before sending the same referral again."}
      </p>
      <p className="mt-2 text-muted-foreground">
        {success ? "If it is urgent, " : "For help, "}
        <a className="font-medium text-primary underline" href="tel:1300004267">call 1300 004 267</a>.
      </p>
    </div>
  );
}
