import type { Project } from "@/lib/types";
import { ProjectCard } from "./project-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Wand2 } from "lucide-react";

type AiRecommendationsProps = {
  projects: Project[];
};

export function AiRecommendations({ projects }: AiRecommendationsProps) {
  return (
    <div className="my-16">
      <div className="flex items-center mb-8">
        <Wand2 className="h-8 w-8 text-primary mr-3" />
        <h2 className="font-headline text-3xl font-bold tracking-tight">
          Recommended For You
        </h2>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {projects.map((project) => (
            <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <ProjectCard project={project} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
