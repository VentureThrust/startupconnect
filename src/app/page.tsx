import { recommendRelevantProjects } from "@/ai/flows/recommend-relevant-projects";
import { AiRecommendations } from "@/components/ai-recommendations";
import { ProjectList } from "@/components/project-list";
import { Button } from "@/components/ui/button";
import { projects, users } from "@/lib/data";
import { Rocket } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const currentUser = users[0];
  const allProjects = projects;
  
  const recommendations = await recommendRelevantProjects({
    userSkills: currentUser.skills,
    userExperience: currentUser.experience,
    projectDetails: allProjects.map((p) => ({
      projectId: p.id,
      description: p.description,
      requiredSkills: p.requiredSkills,
    })),
  });

  const recommendedProjects = allProjects.filter((p) =>
    recommendations.recommendedProjectIds.includes(p.id)
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center py-12">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter mb-4">
          Find Your Next Collaborator
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Nexus Start is the ultimate platform for founders, developers, and designers to connect and build the future, together.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
            <Button size="lg" asChild>
                <Link href="/projects/create">
                    <Rocket className="mr-2" /> Post a Project
                </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
                <Link href="/profile/create">Create Your Profile</Link>
            </Button>
        </div>
      </div>

      {recommendedProjects.length > 0 && (
        <AiRecommendations projects={recommendedProjects} />
      )}

      <div className="mt-16">
        <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">
          Discover All Projects
        </h2>
        <ProjectList projects={allProjects} />
      </div>
    </div>
  );
}
