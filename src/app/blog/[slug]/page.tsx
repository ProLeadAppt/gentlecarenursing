import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getArticleSchema } from "@/lib/schema";
import { BlogPostLayout } from "@/components/sections/BlogPostLayout";
import { getAllBlogPosts, getBlogPostBySlug } from "@/content/blog";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: post.excerpt,
    canonical: `${INTEGRATIONS.siteUrl}/blog/${slug}`,
    ...(post.featuredImageSrc
      ? {
          openGraph: {
            images: [
              {
                url: post.featuredImageSrc,
                width: 1200,
                height: 630,
                alt: post.featuredImageAlt ?? post.title,
              },
            ],
          },
        }
      : {}),
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://gentlecarenursing.com.au";

  const articleSchema = getArticleSchema({
    title: post.title,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    author: post.author,
    featuredImageSrc: post.featuredImageSrc,
    url: `${siteUrl}/blog/${post.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <BlogPostLayout post={post} />
    </>
  );
}
