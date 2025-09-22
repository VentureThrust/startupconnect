
'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { users, projects } from "@/lib/data";
import { ProjectList } from "@/components/project-list";
import { AiRecommendations } from "@/components/ai-recommendations";
import { recommendRelevantProjects } from "@/ai/flows/recommend-relevant-projects";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Rocket } from 'lucide-react';


export default function DiscoverPage() {
  const router = useRouter();
  const currentUser = users.length > 0 ? users[0] : null;

  useEffect(() => {
    if (!currentUser) {
      router.push('/login');
    }
  }, [currentUser, router]);

  // To prevent rendering anything while redirecting
  if (!currentUser) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  // Since we have no default projects, let's just show a welcome message
  // In a real app, the recommendations would be fetched here.
  const recommendedProjects: any[] = [];
  const otherProjects = projects;

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-5xl font-bold tracking-tighter mb-12">
        Discover Projects
      </h1>
      
      {recommendedProjects.length > 0 && (
        <AiRecommendations projects={recommendedProjects} />
      )}

      {otherProjects.length > 0 ? (
        <ProjectList projects={otherProjects} />
      ) : (
         <div className="text-center py-24 border-2 border-dashed rounded-lg">
            <Rocket className="h-16 w-16 text-muted-foreground mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold">No Projects Yet</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                It looks a little empty in here. Be the first to post a project and find collaborators!
            </p>
             <Button asChild className="mt-6">
                <Link href="/projects/create">Post a Project</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
