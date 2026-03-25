/**
 * Blog content system.
 * TypeScript content objects — consistent with the rest of the project.
 * AI-generated seed posts; Gemma approves before publish.
 */

export type BlogCategory =
  | "ndis"
  | "aged-care"
  | "clinical"
  | "family-carers"
  | "guides";

export interface BlogAuthor {
  name: string;
  role: string;
  avatarSrc?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readingTimeMinutes: number;
  featuredImageSrc?: string;
  featuredImageAlt?: string;
  tags: string[];
  relatedSlugs?: string[];
}

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; color: string }> = {
  ndis: { label: "NDIS", color: "bg-pw-sage/10 text-pw-sage" },
  "aged-care": { label: "Aged Care", color: "bg-pw-teal/10 text-pw-teal" },
  clinical: { label: "Clinical", color: "bg-primary/10 text-primary" },
  "family-carers": { label: "Family Carers", color: "bg-pw-terracotta/10 text-pw-terracotta" },
  guides: { label: "Guides", color: "bg-pw-amber/10 text-pw-amber-700" },
};

const DEFAULT_AUTHOR: BlogAuthor = {
  name: "Gentle Care Nursing",
  role: "Clinical Team",
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "understanding-ndis-in-home-nursing",
    title: "Understanding NDIS In-Home Nursing: What's Covered and How to Access It",
    excerpt:
      "A clear guide to NDIS-funded in-home nursing services — what's included, how to request it, and what to expect from your provider.",
    content: `
      <p>Navigating the NDIS can feel overwhelming, especially when you're trying to understand what nursing and care services your plan actually covers. This guide breaks it down in plain language.</p>

      <h2>What NDIS in-home nursing covers</h2>
      <p>If you have an NDIS plan with funding for capacity building or core supports, you may be eligible for in-home nursing services. This can include:</p>
      <ul>
        <li>Medication management and administration</li>
        <li>Wound care and dressing changes</li>
        <li>PEG feeding and catheter care</li>
        <li>Health monitoring and clinical observations</li>
        <li>Post-hospital transitional support</li>
        <li>Complex care coordination</li>
      </ul>

      <h2>How to access NDIS nursing</h2>
      <p>To access in-home nursing through the NDIS, you'll need:</p>
      <ol>
        <li><strong>An active NDIS plan</strong> with relevant funding categories</li>
        <li><strong>A support coordinator</strong> (or self-management) to help you find a registered provider</li>
        <li><strong>A service agreement</strong> between you and your chosen provider</li>
      </ol>
      <p>Your support coordinator can help you identify the right provider. When choosing, look for a registered NDIS provider with clinical nursing experience — not just personal care.</p>

      <h2>What to expect from a quality provider</h2>
      <p>A good NDIS nursing provider should:</p>
      <ul>
        <li>Respond to your enquiry within 24 hours</li>
        <li>Conduct a thorough needs assessment before starting</li>
        <li>Match you with a consistent nurse or carer</li>
        <li>Provide regular updates to your coordinator and family</li>
        <li>Be transparent about pricing and service agreements</li>
      </ul>
      <p>At Gentle Care Nursing, we keep our client list intentionally small so every person receives dedicated, personalised attention. We're registered NDIS providers with 10+ years of clinical nursing experience.</p>

      <h2>Questions to ask your provider</h2>
      <p>Before signing a service agreement, ask:</p>
      <ul>
        <li>Are you a registered NDIS provider?</li>
        <li>What qualifications do your nurses hold?</li>
        <li>Will I have the same nurse each visit?</li>
        <li>How quickly can you start services?</li>
        <li>How do you handle after-hours needs?</li>
      </ul>
    `,
    category: "ndis",
    author: DEFAULT_AUTHOR,
    publishedAt: "2025-11-15",
    readingTimeMinutes: 5,
    tags: ["NDIS", "in-home nursing", "funding", "support coordination"],
    relatedSlugs: ["choosing-the-right-home-care-provider", "what-families-should-know-about-aged-care"],
  },
  {
    slug: "choosing-the-right-home-care-provider",
    title: "How to Choose the Right Home Care Provider in Sydney",
    excerpt:
      "Not all home care providers are the same. Here's what to look for when choosing in-home nursing and care for yourself or a loved one.",
    content: `
      <p>Choosing a home care provider is one of the most important decisions a family can make. The quality of care directly affects your loved one's safety, independence, and wellbeing. Here's how to make the right choice.</p>

      <h2>Quality over volume</h2>
      <p>Large providers often manage hundreds of clients with rotating staff. This can mean inconsistent care, unfamiliar faces, and limited personal attention. Look for a provider that prioritises quality over volume — one that keeps their client list manageable so every person receives dedicated support.</p>

      <h2>Key things to check</h2>
      <ul>
        <li><strong>Registration:</strong> Are they registered with the NDIS, DVA, or relevant aged care bodies?</li>
        <li><strong>Clinical qualifications:</strong> Do they employ registered nurses, or only personal care workers?</li>
        <li><strong>Response times:</strong> How quickly do they respond to enquiries and urgent needs?</li>
        <li><strong>Consistency:</strong> Will you have the same carer or nurse each visit?</li>
        <li><strong>Reviews and references:</strong> What do other families and professionals say?</li>
      </ul>

      <h2>Red flags to watch for</h2>
      <p>Be cautious of providers who:</p>
      <ul>
        <li>Take more than 48 hours to respond to your initial enquiry</li>
        <li>Can't tell you who will be providing care</li>
        <li>Don't conduct a proper needs assessment before starting</li>
        <li>Have high staff turnover or rely heavily on agency workers</li>
        <li>Are vague about pricing or service agreements</li>
      </ul>

      <h2>The boutique difference</h2>
      <p>A boutique provider like Gentle Care Nursing takes a different approach. We intentionally limit our client load so we can offer:</p>
      <ul>
        <li>Consistent, familiar nurses and carers</li>
        <li>Faster response times (within 24 hours guaranteed)</li>
        <li>Personalised care plans tailored to individual needs</li>
        <li>Direct access to our clinical director</li>
      </ul>
      <p>When you choose boutique care, you're choosing a team that knows your loved one by name — not by file number.</p>
    `,
    category: "family-carers",
    author: DEFAULT_AUTHOR,
    publishedAt: "2025-10-08",
    readingTimeMinutes: 4,
    tags: ["home care", "choosing a provider", "Sydney", "family carers"],
    relatedSlugs: ["understanding-ndis-in-home-nursing", "supporting-a-loved-one-after-hospital"],
  },
  {
    slug: "what-families-should-know-about-aged-care",
    title: "What Families Should Know About Aged Care at Home in 2025",
    excerpt:
      "Aged care is changing. Here's what Sydney families need to know about in-home aged care options, funding, and finding the right support.",
    content: `
      <p>The aged care landscape in Australia is shifting. More families are choosing to support their loved ones at home rather than in residential facilities. Here's what you need to know about in-home aged care in 2025.</p>

      <h2>The shift to home-based care</h2>
      <p>Most older Australians prefer to age in their own homes. The Australian Government's Support at Home programme reflects this, providing funding for in-home care services that help people maintain their independence and stay connected to their community.</p>

      <h2>Types of in-home aged care</h2>
      <ul>
        <li><strong>Personal care:</strong> Help with bathing, dressing, grooming, and mobility</li>
        <li><strong>Nursing care:</strong> Medication management, wound care, health monitoring</li>
        <li><strong>Domestic assistance:</strong> Cleaning, meal preparation, laundry</li>
        <li><strong>Social support:</strong> Companionship, community access, transport</li>
        <li><strong>Respite care:</strong> Temporary relief for family carers</li>
      </ul>

      <h2>Funding options</h2>
      <p>In-home aged care can be funded through:</p>
      <ol>
        <li><strong>Commonwealth Home Support Programme (CHSP):</strong> Entry-level support for everyday tasks</li>
        <li><strong>Home Care Packages:</strong> More comprehensive support with four levels of funding</li>
        <li><strong>DVA services:</strong> For eligible veterans and their partners</li>
        <li><strong>Private funding:</strong> Self-funded care without wait times</li>
      </ol>

      <h2>What good aged care looks like</h2>
      <p>Quality aged care at home means more than just task completion. It means:</p>
      <ul>
        <li>Treating each person with dignity and respect</li>
        <li>Maintaining routines and preferences</li>
        <li>Involving the family in care planning</li>
        <li>Providing consistent, familiar carers</li>
        <li>Being responsive when needs change</li>
      </ul>
      <p>At Gentle Care Nursing, we believe aged care should feel personal. That's why we keep our client load small and match every person with a dedicated carer who understands their needs, preferences, and personality.</p>
    `,
    category: "aged-care",
    author: DEFAULT_AUTHOR,
    publishedAt: "2025-09-20",
    readingTimeMinutes: 5,
    tags: ["aged care", "home care packages", "Support at Home", "Sydney"],
    relatedSlugs: ["choosing-the-right-home-care-provider", "tips-for-family-carers-avoiding-burnout"],
  },
  {
    slug: "supporting-a-loved-one-after-hospital",
    title: "Supporting a Loved One After Hospital Discharge: A Family Guide",
    excerpt:
      "The transition from hospital to home can be stressful. Here's how to prepare, what support is available, and how in-home nursing can help.",
    content: `
      <p>When a loved one is discharged from hospital, the relief of them coming home can quickly turn to anxiety. How will you manage their medications? What if the wound needs attention? Will they be safe on their own? This guide helps you prepare.</p>

      <h2>Before discharge</h2>
      <p>Start planning before your loved one leaves hospital:</p>
      <ul>
        <li>Ask the discharge planner about in-home nursing options</li>
        <li>Understand what medications need to be taken and when</li>
        <li>Find out what follow-up appointments are needed</li>
        <li>Check if any mobility aids or equipment are required at home</li>
        <li>Contact a home care provider to arrange support (ideally before discharge)</li>
      </ul>

      <h2>The first week at home</h2>
      <p>The first week is often the hardest. Your loved one may be:</p>
      <ul>
        <li>More tired and less mobile than expected</li>
        <li>Confused about medication schedules</li>
        <li>Anxious about pain, falls, or complications</li>
        <li>Frustrated by loss of independence</li>
      </ul>
      <p>Having a registered nurse visit in the first few days provides reassurance for everyone. They can check wounds, review medications, monitor for complications, and give practical advice for the recovery ahead.</p>

      <h2>When to seek in-home nursing</h2>
      <p>Consider professional in-home nursing support if your loved one:</p>
      <ul>
        <li>Has surgical wounds that need regular dressing</li>
        <li>Requires complex medication management</li>
        <li>Has limited mobility and needs help with daily tasks</li>
        <li>Lives alone or their family carer works during the day</li>
        <li>Had a fall before hospitalisation and is at risk of falling again</li>
      </ul>

      <h2>How Gentle Care Nursing helps</h2>
      <p>We work closely with hospital discharge teams to ensure a seamless transition from hospital to home. Our registered nurses can be in your loved one's home within 24 hours of referral, providing clinical oversight, personal care, and the peace of mind that comes from knowing a qualified professional is looking after things.</p>
    `,
    category: "clinical",
    author: DEFAULT_AUTHOR,
    publishedAt: "2025-08-12",
    readingTimeMinutes: 5,
    tags: ["post-hospital care", "discharge planning", "family support", "recovery"],
    relatedSlugs: ["choosing-the-right-home-care-provider", "tips-for-family-carers-avoiding-burnout"],
  },
  {
    slug: "tips-for-family-carers-avoiding-burnout",
    title: "5 Signs of Carer Burnout — and What to Do About It",
    excerpt:
      "Family carers often put everyone else first. Here are the warning signs of burnout and practical steps to protect your own wellbeing.",
    content: `
      <p>Caring for a family member is one of the most selfless things a person can do. But it can also be one of the most exhausting. Carer burnout is real, and recognising the signs early can make all the difference.</p>

      <h2>1. You feel constantly exhausted</h2>
      <p>Tiredness that doesn't improve with rest is a red flag. Caring responsibilities often mean broken sleep, early mornings, and long days. If you're feeling physically and emotionally drained most of the time, your body is telling you something.</p>

      <h2>2. You've stopped doing things you enjoy</h2>
      <p>When caring takes over, hobbies, social activities, and personal time are often the first things to go. If you can't remember the last time you did something just for yourself, it's time to reassess.</p>

      <h2>3. You feel resentful or irritable</h2>
      <p>It's completely normal to feel frustrated sometimes. But if resentment is becoming your default emotion, it's a sign that you need more support. Guilt about these feelings often makes things worse.</p>

      <h2>4. Your own health is suffering</h2>
      <p>Skipping your own medical appointments, ignoring symptoms, or relying on unhealthy coping mechanisms (too much caffeine, alcohol, or not eating properly) are all signs that caring responsibilities are affecting your health.</p>

      <h2>5. You feel isolated</h2>
      <p>Caring can be lonely. If you feel like no one understands what you're going through, or if you've withdrawn from friends and family, reach out. You don't have to do this alone.</p>

      <h2>What you can do</h2>
      <ul>
        <li><strong>Accept help:</strong> When people offer, say yes. Be specific about what would help most.</li>
        <li><strong>Explore respite care:</strong> Even a few hours of professional support each week can make a huge difference.</li>
        <li><strong>Talk to your GP:</strong> They can connect you with carer support services and check on your own health.</li>
        <li><strong>Connect with other carers:</strong> Carer support groups (online and in-person) provide understanding and practical advice.</li>
        <li><strong>Consider in-home nursing:</strong> A registered nurse visiting regularly can take clinical tasks off your plate — medication management, wound care, health monitoring — so you can focus on being a family member, not a clinician.</li>
      </ul>
      <p>At Gentle Care Nursing, we support family carers as much as we support clients. If you're feeling overwhelmed, get in touch. We can discuss what support might help, with no obligation.</p>
    `,
    category: "family-carers",
    author: DEFAULT_AUTHOR,
    publishedAt: "2025-07-05",
    readingTimeMinutes: 4,
    tags: ["carer burnout", "family carers", "respite care", "self-care"],
    relatedSlugs: ["what-families-should-know-about-aged-care", "choosing-the-right-home-care-provider"],
  },
];

export function getAllBlogPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllBlogPosts().filter((p) => p.category === category);
}

export function getAllBlogCategories(): BlogCategory[] {
  const categories = new Set(BLOG_POSTS.map((p) => p.category));
  return Array.from(categories);
}

export function getRelatedPosts(currentSlug: string, limit = 3): BlogPost[] {
  const current = getBlogPostBySlug(currentSlug);
  if (!current) return [];

  if (current.relatedSlugs?.length) {
    const related = current.relatedSlugs
      .map((s) => getBlogPostBySlug(s))
      .filter((p): p is BlogPost => !!p)
      .slice(0, limit);
    if (related.length >= limit) return related;
  }

  return getAllBlogPosts()
    .filter((p) => p.slug !== currentSlug)
    .slice(0, limit);
}
