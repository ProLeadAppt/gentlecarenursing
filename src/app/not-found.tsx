import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { Heading } from "@/components/ui/Heading";

export default function NotFound() {
  return (
    <Section size="lg" variant="card">
      <Container size="md" className="py-24 text-center">
        <Heading level="h1" as="h1">
          Page not found
        </Heading>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Button variant="primary" size="lg" className="mt-8" href="/">
          Return home
        </Button>
      </Container>
    </Section>
  );
}
