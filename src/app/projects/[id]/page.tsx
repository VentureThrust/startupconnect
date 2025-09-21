import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, users } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, Tag, CheckCircle, XCircle, Bookmark, Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { matchSkillsToProjects } from "@/ai/flows/match-skills-to-projects";
import { Button } from "@/components/ui/button";
import { ApplyDialog } from "@/components/apply-dialog";
import Link from "next/link";

type ProjectPageProps = {
  params: {
    id: string;
  };
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.id === params.id);
  const currentUser = users.length > 0 ? users[0] : null;

  if (!project) {
    notFound();
  }

  const projectOwner = users.find((u) => u.id === project.ownerId) || { name: "A Founder", avatarUrl: "https://picsum.photos/seed/founder/100/100" };

  const matchResult = currentUser ? await matchSkillsToProjects({
    projectDescription: project.description,
    requiredSkills: project.requiredSkills,
    userSkills: currentUser.skills,
  }) : { isMatch: false, matchReason: "Create a profile to see your skill match."};

  const isOwner = currentUser && currentUser.id === project.ownerId;

  return (
    <div className="container mx-auto max-w-5xl py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div>
            <div className="relative aspect-[16/9] w-full mb-6">
              <Image
                src={project.imageUrl}
                alt={project.name}
                fill
                className="rounded-xl object-cover"
                data-ai-hint={project.imageHint}
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h1 className="font-headline text-5xl font-bold tracking-tighter">
                  {project.name}
                </h1>
                <p className="text-xl text-muted-foreground mt-2">{project.description}</p>
              </div>
              {isOwner && (
                <Button variant="outline" asChild>
                  <Link href={`/projects/create?id=${project.id}`}>
                    <Pencil className="mr-2"/> Edit
                  </Link>
                </Button>
              )}
            </div>
          </div>

          <Separator />

          {/* Long Description */}
          <div>
            <h2 className="text-2xl font-bold font-headline mb-4">About the Project</h2>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {project.longDescription}
            </p>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center text-muted-foreground">
                <Image
                  src={projectOwner.avatarUrl}
                  alt={projectOwner.name}
                  width={40}
                  height={40}
                  className="rounded-full mr-3"
                />
                <div>
                  <span className="font-semibold text-foreground">{projectOwner.name}</span>
                  <p className="text-sm">Project Owner</p>
                </div>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-3 text-accent" />
                <span className="font-semibold">Team Size:</span>
                <span className="ml-2 text-muted-foreground">{project.teamSize}</span>
              </div>
               <div className="flex items-start">
                <Tag className="h-5 w-5 mr-3 mt-1 text-accent" />
                <div>
                  <span className="font-semibold">Compensation</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary">{project.compensation}</Badge>
                    {project.equitySplit && <Badge variant="secondary">{project.equitySplit}</Badge>}
                    {project.incentives && <Badge variant="secondary">{project.incentives}</Badge>}
                  </div>
                </div>
              </div>
              <div className="flex items-start">
                <Tag className="h-5 w-5 mr-3 mt-1 text-accent" />
                <div>
                  <span className="font-semibold">Skills Needed</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.requiredSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    {matchResult.isMatch ? <CheckCircle className="text-green-500" /> : <XCircle className="text-red-500" />}
                    Your Skill Match
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">{matchResult.matchReason}</p>
            </CardContent>
          </Card>
          
          <div className="pt-4 flex gap-2">
            <ApplyDialog>
              <Button size="lg" className="w-full">
                <Handshake className="mr-2 h-5 w-5" />
                Apply to Collaborate
              </Button>
            </ApplyDialog>
            <Button size="lg" variant="outline" className="w-full">
                <Bookmark className="mr-2 h-5 w-5" />
                Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
