import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid } from "@/components/layout/Grid";
import { SectionHeader } from "@/components/sections/SectionHeader";
import { CredentialsSection } from "@/components/sections/CredentialsSection";
import { CtaSection } from "@/components/sections/CtaSection";
import { FounderStory } from "@/components/sections/FounderStory";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { MilestoneTimeline } from "@/components/sections/MilestoneTimeline";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Heading } from "@/components/ui/Heading";
import { Card } from "@/components/ui/Card";
import { CTA_LINKS } from "@/lib/constants";
import { createMetadata } from "@/lib/metadata";
import { INTEGRATIONS } from "@/config/integrations";
import { getPersonSchema } from "@/lib/schema";
import {
  ABOUT_INTRO,
  ELEVATOR_PITCH,
  MISSION,
  VALUES,
  FOUNDER_STORY,
  TEAM_MEMBERS,
  MILESTONES,
  TRUST_STATS,
  CASE_STUDIES,
} from "@/content/about";

const founderSchema = getPersonSchema({
  name: FOUNDER_STORY.name,
  jobTitle: FOUNDER_STORY.title,
  // Use the first paragraph of the founder bio so the schema description is
  // self-contained and doesn't carry a stray "\n\n" from the on-page format.
  description: FOUNDER_STORY.bio.split("\n\n")[0],
  imagePath: FOUNDER_STORY.imageSrc,
  profilePath: "/about",
  knowsAbout: [
    "In-home nursing",
    "Dementia care",
    "Palliative care",
    "Disability support",
    "Mental health support",
    "Aged care at home",
    "Care planning",
  ],
});

export const metadata = createMetadata({
  title: "About Us",
  description:
    "About Gentle Care: a personalised in-home care provider focused on quality, consistency and genuine relationships. Registered NDIS and DVA Contracted provider.",
  canonical: `${INTEGRATIONS.siteUrl}/about`,
});

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(founderSchema) }}
      />

      {/* Hero Intro */}
      <Section size="lg" variant="card">
        <Container size="md">
          <Breadcrumbs
            items={[{ label: "Home", href: "/" }, { label: "About Us" }]}
            className="mb-6"
          />
          <Heading
            level="h1"
            as="h1"
            className="text-center font-[family-name:var(--font-serif)] text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
          >
            {ABOUT_INTRO.title}
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {ELEVATOR_PITCH}
          </p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted-foreground">
            {ABOUT_INTRO.lead}
          </p>
        </Container>
      </Section>

      {/* Stats Bar */}
      <Section size="sm" variant="muted">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
            {TRUST_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-serif)] text-3xl sm:text-4xl font-bold text-primary">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Founder Story */}
      <FounderStory
        name={FOUNDER_STORY.name}
        title={FOUNDER_STORY.title}
        bio={FOUNDER_STORY.bio}
        quote={FOUNDER_STORY.quote}
        imageSrc={FOUNDER_STORY.imageSrc}
        imageAlt={FOUNDER_STORY.imageAlt}
      />

      {/* Mission */}
      <Section variant="muted">
        <Container size="md">
          <SectionHeader title={MISSION.title} />
          <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            {MISSION.description}
          </p>
        </Container>
      </Section>

      {/* Values */}
      <Section>
        <Container>
          <SectionHeader
            title="Our Values"
            subtitle="The principles that guide everything we do."
          />
          <Grid cols={3} gap="lg" className="mt-12">
            {VALUES.map((value) => (
              <Card key={value.title} variant="default">
                <Heading level="h3" as="h3" className="text-lg">
                  {value.title}
                </Heading>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </Card>
            ))}
          </Grid>
        </Container>
      </Section>

      {/* Team */}
      <TeamGrid members={TEAM_MEMBERS} />

      {/* Milestone Timeline */}
      <MilestoneTimeline milestones={MILESTONES} />

      {/* Case Studies Placeholder */}
      <Section variant="muted">
        <Container size="md" className="text-center">
          <Heading level="h2" as="h2" className="font-[family-name:var(--font-serif)] text-3xl font-bold">
            {CASE_STUDIES.title}
          </Heading>
          <p className="mt-4 text-lg text-muted-foreground">
            {CASE_STUDIES.description}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {CASE_STUDIES.topics.map((topic) => (
              <span
                key={topic}
                className="inline-flex items-center rounded-full bg-background px-4 py-2 text-sm font-medium text-foreground shadow-pw-sm border border-border"
              >
                {topic}
              </span>
            ))}
          </div>
        </Container>
      </Section>

      {/* Credentials */}
      <CredentialsSection variant="default" showLinks />

      {/* CTA */}
      <CtaSection
        title="Ready to Learn More?"
        description="Get in touch to discuss how we can help you or your loved one."
        primaryCta={CTA_LINKS.requestCare}
        secondaryCta={CTA_LINKS.contact}
        variant="primary"
      />
    </>
  );
}
