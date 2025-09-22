
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";
import { users, projects } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Building, Lightbulb, Briefcase, Code, GraduationCap } from "lucide-react";
import { ProjectList } from "@/components/project-list";

export default function ProfilePage() {
  const router = useRouter();
  const user = users.length > 0 ? users[0] : null;

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    // This will be shown briefly while redirecting
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }
  
  const userProjects = projects.filter(p => p.ownerId === user.id);

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <div className="flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:w-1/3 flex flex-col items-center">
            <div className="relative h-40 w-40 mb-4">
                <Image
                    src={user.avatarUrl}
                    alt={user.name}
                    width={160}
                    height={160}
                    className="rounded-full object-cover border-4 border-primary"
                />
            </div>
            <h1 className="text-3xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground">{user.startupName}</p>
            {user.college && <p className="text-muted-foreground flex items-center gap-2 mt-1"><GraduationCap className="h-4 w-4"/> {user.college}</p>}
            <Button variant="outline" size="sm" asChild className="mt-4">
                <Link href="/profile/create">
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
            </Button>
        </div>

        <div className="w-full md:w-2/3 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Building className="text-accent"/> About My Startup</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{user.description}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Lightbulb className="text-accent"/> My Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {user.skills.map((skill) => (
                        <Badge key={skill} variant="default">{skill}</Badge>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Briefcase className="text-accent"/> My Experience</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground whitespace-pre-wrap">{user.experience}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Code className="text-accent"/> What I'm Building</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">{user.productDetails}</p>
                </CardContent>
            </Card>
        </div>
      </div>
      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">My Projects</h2>
        {userProjects.length > 0 ? (
            <ProjectList projects={userProjects} />
        ) : (
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-2xl font-semibold">You haven't posted any projects yet.</h3>
                <Button asChild className="mt-4">
                    <Link href="/projects/create">Post a Project</Link>
                </Button>
            </div>
        )}
      </div>
    </div>
  );
}
