
import { users, projects } from "@/lib/data";
import { ProjectList } from "@/components/project-list";
import { AiRecommendations } from "@/components/ai-recommendations";
import { recommendRelevantProjects } from "@/ai/flows/recommend-relevant-projects";

export default async function DiscoverPage() {
  const currentUser = users.length > 0 ? users[0] : null;

  let recommendedProjects: any[] = [];
  if (currentUser) {
    try {
      const recommendations = await recommendRelevantProjects({
        userSkills: currentUser.skills,
        userExperience: currentUser.experience,
        projectDetails: projects.map(p => ({
          projectId: p.id,
          description: p.description,
          requiredSkills: p.requiredSkills,
        })),
      });
      recommendedProjects = projects.filter(p => recommendations.recommendedProjectIds.includes(p.id));
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      recommendedProjects = [];
    }
  }
  
  const otherProjects = projects.filter(p => !recommendedProjects.find(rp => rp.id === p.id));


  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-headline text-5xl font-bold tracking-tighter mb-12">
        Discover Projects
      </h1>
      
      {recommendedProjects.length > 0 && (
        <AiRecommendations projects={recommendedProjects} />
      )}

      <ProjectList projects={otherProjects.length > 0 ? otherProjects : projects} />
    </div>
  );
}
