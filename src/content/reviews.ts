/**
 * Google Reviews data.
 * Leave empty until confirmed GBP review metadata is available.
 * Avoids showing placeholder counts or fabricated social proof.
 */

export interface GoogleReviewsData {
  averageRating: number | null;
  reviewCount: number | null;
  /** Google Business Profile URL — leave empty until confirmed */
  googleUrl: string;
}

export const GOOGLE_REVIEWS: GoogleReviewsData = {
  averageRating: null,
  reviewCount: null,
  googleUrl: "",
};
