import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/types";
import { Users, Tag, Bookmark } from "lucide-react";
import { Button } from "./ui/button";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all duration-300 ease-in-out hover:border-primary hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 group">
      <CardHeader>
        <div className="aspect-[3/2] relative mb-4">
          <Link href={`/projects/${project.id}`} className="block">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={project.imageHint}
            />
          </Link>
        </div>
        <div className="flex justify-between items-start">
            <Link href={`/projects/${project.id}`} className="block">
                <CardTitle className="font-headline group-hover:text-primary transition-colors">
                    {project.name}
                </CardTitle>
            </Link>
            <Button variant="ghost" size="icon" className="shrink-0">
                <Bookmark/>
                <span className="sr-only">Save project</span>
            </Button>
        </div>

        <CardDescription>
            <Link href={`/projects/${project.id}`} className="block">
                {project.description}
            </Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center text-sm text-muted-foreground mb-4">
          <Tag className="mr-2 h-4 w-4 text-accent" />
          <h3 className="font-semibold mr-2">Skills Needed:</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {project.requiredSkills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="secondary">
              {skill}
            </Badge>
          ))}
          {project.requiredSkills.length > 4 && (
            <Badge variant="outline">+{project.requiredSkills.length - 4} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center text-sm text-muted-foreground">
          <Users className="mr-2 h-4 w-4" />
          <span>Team Size: {project.teamSize}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
