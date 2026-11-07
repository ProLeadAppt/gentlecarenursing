import type { BlogPost } from "./blog";

const RELATED_SERVICE_LINKS: Record<BlogPost["category"], { title: string; href: string; description: string }[]> = {
  ndis: [
    { title: "NDIS Services", href: "/ndis", description: "Explore our core NDIS support page and how we work with participants and coordinators." },
    { title: "Complex Care Support", href: "/services/complex-care", description: "Clinical support for PEG feeding, tracheostomy care, and higher-acuity home care." },
    { title: "Personal Care & Daily Support", href: "/services/personal-care", description: "Help with the daily routines that make independent living easier." },
  ],
  "aged-care": [
    { title: "Aged Care at Home", href: "/aged-care", description: "See how we help older Australians stay safe and comfortable at home." },
    { title: "Post-Hospital Nursing & Care", href: "/services/post-hospital-care", description: "Recovery support after discharge or a change in health status." },
    { title: "What Families Should Know About Aged Care", href: "/blog/what-families-should-know-about-aged-care", description: "A practical guide for families comparing home care options." },
  ],
  clinical: [
    { title: "Clinical Nursing at Home", href: "/services/nursing-care", description: "Home nursing, wound care, medication support, and clinical oversight." },
    { title: "Post-Hospital Nursing & Care", href: "/services/post-hospital-care", description: "The safest way to bridge discharge and recovery at home." },
    { title: "Palliative & End-of-Life Support", href: "/services/palliative-care", description: "Comfort-focused support for families and specialist teams." },
  ],
  "family-carers": [
    { title: "Support for Family Carers", href: "/blog/tips-for-family-carers-avoiding-burnout", description: "Practical strategies for carers carrying a lot at home." },
    { title: "Choosing the Right Home Care Provider", href: "/blog/choosing-the-right-home-care-provider", description: "How to compare providers without getting lost in jargon." },
    { title: "Referral Portal", href: "/referrers", description: "Clear referral pathways for coordinators and professionals." },
  ],
};

/** Exclude the article already being read from next-step cards. */
export function getBlogNextSteps(post: Pick<BlogPost, "slug" | "category">) {
  return RELATED_SERVICE_LINKS[post.category].filter(item => item.href !== `/blog/${post.slug}`);
}
