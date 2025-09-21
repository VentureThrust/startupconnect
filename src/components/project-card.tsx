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
import { Users, Tag } from "lucide-react";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-300 ease-in-out group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 group-hover:-translate-y-1">
        <CardHeader>
          <div className="aspect-[3/2] relative mb-4">
            <Image
              src={project.imageUrl}
              alt={project.name}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={project.imageHint}
            />
          </div>
          <CardTitle className="font-headline group-hover:text-primary transition-colors">
            {project.name}
          </CardTitle>
          <CardDescription>{project.description}</CardDescription>
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
    </Link>
  );
}
