import { Container } from "@/components/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TechStackMarquee } from "@/components/TechStackMarquee";
import { HowItWorks } from "@/components/HowItWorks";

export default function Home() {
  return (
    <Container>
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-5">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            Real-Time Poll Rooms
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create polls, share links, and watch results update in real-time.
            Simple, fast, and free.
          </p>

          <div className="flex gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/signup">Get Started Free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Sign up required to create polls
          </p>
        </div>

        <div className="w-full h-px bg-border/20 my-8 max-w-7xl mx-auto"></div>

        <HowItWorks />

        <div className="w-full h-px bg-border/20 my-8 max-w-7xl mx-auto"></div>

        <TechStackMarquee />
      </div>
    </Container>
  );
}
