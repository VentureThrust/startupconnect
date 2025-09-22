
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/lib/data";
import { NexusStartLogo } from "@/components/icons";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // This is a mock authentication flow.
    // We clear any existing user data to simulate a new login.
    users.splice(0, users.length);
    router.push("/profile/create");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="absolute top-4 left-4">
            <Link href="/" className="flex items-center space-x-2 text-foreground/80 hover:text-foreground">
                <NexusStartLogo className="h-6 w-6" />
                <span className="font-bold font-headline">Nexus Start</span>
            </Link>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mb-4">
                <NexusStartLogo className="h-12 w-12 mx-auto text-primary" />
            </div>
          <CardTitle className="font-headline text-3xl">Welcome to Nexus Start</CardTitle>
          <CardDescription>
            Sign in or create an account to continue.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Continue with Email
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
