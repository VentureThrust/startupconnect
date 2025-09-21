
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


export default async function Home() {

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
            Build Your Startup, Together.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Nexus Start is the ultimate platform for founders, developers, and designers to connect, collaborate, and turn brilliant ideas into reality. Find co-founders, hire talent, and join exciting projects.
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
  );
}
