
import { projects } from "@/lib/data";
import { ProjectList } from "@/components/project-list";
import { Bookmark } from "lucide-react";

export default function SavedProjectsPage() {
  const savedProjects = projects.filter(p => p.saved);

  return (
    <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-12">
            <Bookmark className="h-10 w-10 text-primary mr-4"/>
            <h1 className="font-headline text-5xl font-bold tracking-tighter">
                Saved Projects
            </h1>
        </div>
      
      {savedProjects.length > 0 ? (
        <ProjectList projects={savedProjects} />
      ) : (
        <div className="text-center py-24 border-2 border-dashed rounded-lg">
            <Bookmark className="h-16 w-16 text-muted-foreground mx-auto mb-4"/>
            <h3 className="text-2xl font-semibold">No Saved Projects Yet</h3>
            <p className="text-muted-foreground mt-2">
                Click the bookmark icon on a project to save it for later.
            </p>
        </div>
      )}
    </div>
  );
}
