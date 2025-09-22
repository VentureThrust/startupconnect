
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Rocket, LogIn } from "lucide-react";
import { NexusStartLogo } from "./icons";
import { users } from "@/lib/data";


const navLinks = [
  { href: "/discover", label: "Discover" },
  { href: "/saved", label: "Saved Projects" },
  { href: "/projects/create", label: "Create Project" },
  { href: "/profile", label: "My Profile" },
];

export function Header() {
  const pathname = usePathname();
  // A simple mock for checking if the user is "logged in" and has a profile
  const hasProfile = users.length > 0;

  // Don't show header on the login or initial profile creation page
  if (pathname === '/login' || (pathname === '/profile/create' && !hasProfile)) {
    return null;
  }
  
  // A simplified header for the landing page
  if (!hasProfile) {
    return (
       <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center">
            <div className="mr-4 flex">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <NexusStartLogo className="h-6 w-6" />
                    <span className="font-bold sm:inline-block font-headline">
                    Nexus Start
                    </span>
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-end gap-2">
                <Button asChild variant="ghost">
                    <Link href="/login">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/login">
                    Sign Up
                    </Link>
                </Button>
            </div>
        </div>
       </header>
    )
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/discover" className="mr-6 flex items-center space-x-2">
            <NexusStartLogo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block font-headline">
              Nexus Start
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <Link href="/discover" className="flex items-center space-x-2">
                <NexusStartLogo className="h-6 w-6" />
                <span className="font-bold font-headline">Nexus Start</span>
              </Link>
              <div className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-end gap-2">
          <Button asChild>
            <Link href="/projects/create">
              <Rocket className="mr-2 h-4 w-4" />
              Post Project
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
