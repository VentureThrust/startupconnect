
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { GraduationCap, Users, Lightbulb, Search, Handshake } from "lucide-react";

export default async function Home() {

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Launch Your College Startup
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Nexus Start is the exclusive platform for college students and recent grads to connect, collaborate, and build the future. Find co-founders, join projects, and turn your ideas into reality.
                </p>
                <div className="pt-6">
                  <Button size="lg" asChild className="h-14 text-xl px-12">
                    <Link href="/profile/create">Get Started</Link>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="https://picsum.photos/seed/demovid/1280/720"
                  alt="Demo video thumbnail"
                  fill
                  className="object-cover"
                  data-ai-hint="abstract technology"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <Button variant="ghost" size="icon" className="h-20 w-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-white">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.647c1.295.742 1.295 2.545 0 3.286L7.279 20.99c-1.25.717-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">A Simple Path to Collaboration</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to find the right people and projects. Here's how you can get started.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
              <div className="grid gap-1 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">1. Create Your Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Build your profile with our AI assistant. Add your college, skills, and startup ideas to get noticed.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Search className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">2. Discover Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Browse projects from fellow student founders. Filter by skills, compensation, or even your own university network.
                </p>
              </div>
              <div className="grid gap-1 text-center">
                 <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
                  <Handshake className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold">3. Apply & Collaborate</h3>
                <p className="text-sm text-muted-foreground">
                  Apply to projects that excite you. Once accepted, you'll be notified and can start collaborating immediately.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Built for the Next Generation of Innovators
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Whether you're a founder with a vision or a skilled student looking to make an impact, Nexus Start is your launchpad.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="flex flex-col items-center text-center p-8 border rounded-lg bg-card shadow-sm">
                    <Lightbulb className="h-12 w-12 text-accent mb-4"/>
                    <h3 className="text-2xl font-bold mb-2">For Founders</h3>
                    <p className="text-muted-foreground">Post your project, define the skills you need, and specify compensation—be it equity, a paid role, or a co-founder position. Find talent from your own college network and beyond.</p>
                </div>
                <div className="flex flex-col items-center text-center p-8 border rounded-lg bg-card shadow-sm">
                    <Users className="h-12 w-12 text-accent mb-4"/>
                    <h3 className="text-2xl font-bold mb-2">For Collaborators</h3>
                    <p className="text-muted-foreground">Discover exciting startups, showcase your skills, and join a team that values your contribution. Apply with a personal message and get notified when you're accepted.</p>
                </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
