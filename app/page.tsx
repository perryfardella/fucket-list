import { Link } from "@/components/ui/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Mountain,
  Target,
  Trophy,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto max-w-7xl">
          <div className="font-bold text-2xl">The Fucket List</div>
          <nav className="flex items-center gap-4">
            <Link href="/login" variant="nav">
              Log in
            </Link>
            <Link href="/signup" passHref legacyBehavior>
              <Button>Sign up</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 xl:py-40">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Challenge yourself. <br />
                    <span className="text-primary">
                      Achieve the impossible.
                    </span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Track and share your most ambitious goals - the ones that
                    scare you, challenge you, and push you beyond your limits.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup" passHref legacyBehavior>
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#learn-more" passHref legacyBehavior>
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-2">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Mountain
                      className="h-40 w-40 text-primary/40"
                      strokeWidth={1}
                    />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/95 backdrop-blur p-4 shadow-lg">
                    <div className="space-y-2">
                      <h3 className="font-semibold">My Fucket List</h3>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Run an ultramarathon</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Learn to speak Japanese</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-primary" />
                          <span>Start my own business</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="learn-more"
          className="bg-muted/50 py-12 md:py-24 lg:py-32"
        >
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
                What is the Fucket List?
              </h2>
              <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                The Fucket List is built upon Jesse Itzler&apos;s &quot;Fuck It
                List&quot; concept - a collection of ambitious goals that push
                you outside your comfort zone. These aren&apos;t just bucket
                list items; they&apos;re the challenges that make you say
                &quot;fuck it, I&apos;m going for it&quot; despite the fear and
                uncertainty.
              </p>
            </div>

            <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
              <Card className="flex flex-col items-center justify-center border-0 shadow-md">
                <CardHeader className="pb-2">
                  <Target className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Set Ambitious Goals</CardTitle>
                  <CardDescription>
                    Define the challenges that scare you but would transform
                    your life if accomplished.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex flex-col items-center justify-center border-0 shadow-md">
                <CardHeader className="pb-2">
                  <Trophy className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Track Your Progress</CardTitle>
                  <CardDescription>
                    Document your journey with notes, milestones, and completion
                    dates.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card className="flex flex-col items-center justify-center border-0 shadow-md">
                <CardHeader className="pb-2">
                  <Mountain className="h-12 w-12 text-primary mb-2" />
                  <CardTitle>Share Your Journey</CardTitle>
                  <CardDescription>
                    Connect with others who are pushing their limits and share
                    your accomplishments.
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Ready to challenge yourself?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create your Fucket List today and start turning your most
                  ambitious goals into reality.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup" passHref legacyBehavior>
                  <Button size="lg" className="gap-1.5">
                    Create Your List
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4 md:px-6 mx-auto max-w-7xl">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} The Fucket List. All rights reserved.
            Inspired by Jesse Itzler&apos;s concept, but not affiliated with him
            in any way.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" variant="muted" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" variant="muted" className="hover:underline">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
