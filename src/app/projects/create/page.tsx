
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useEffect } from "react";
import { projects, users } from "@/lib/data";


const projectFormSchema = z.object({
  projectName: z.string().min(3, {
    message: "Project name must be at least 3 characters.",
  }),
  description: z.string().max(300, {
    message: "Short description must not be longer than 300 characters.",
  }).min(10, {
    message: "Short description must be at least 10 characters.",
  }),
  longDescription: z.string().min(50, {
    message: "Full description must be at least 50 characters.",
  }),
  requiredSkills: z.string().min(1, { message: "Please enter at least one skill." }),
  teamSize: z.array(z.number()).min(1).max(1),
  compensation: z.enum(["paid", "equity", "partnership", "co-founder"], {
    required_error: "You need to select a compensation type.",
  }),
  equitySplit: z.string().optional(),
  incentives: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function CreateProjectPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('id');
  const currentUser = users.length > 0 ? users[0] : null;

  const existingProject = projectId ? projects.find(p => p.id === projectId) : undefined;

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: existingProject?.name || "",
      description: existingProject?.description || "",
      longDescription: existingProject?.longDescription || "",
      requiredSkills: existingProject?.requiredSkills.join(", ") || "",
      teamSize: [existingProject?.teamSize || 2],
      compensation: existingProject?.compensation || undefined,
      equitySplit: existingProject?.equitySplit || "",
      incentives: existingProject?.incentives || "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (existingProject) {
        form.reset({
            projectName: existingProject.name,
            description: existingProject.description,
            longDescription: existingProject.longDescription,
            requiredSkills: existingProject.requiredSkills.join(", "),
            teamSize: [existingProject.teamSize],
            compensation: existingProject.compensation,
            equitySplit: existingProject.equitySplit,
            incentives: existingProject.incentives,
        });
    }
  }, [existingProject, form]);


  function onSubmit(data: ProjectFormValues) {
    if (!currentUser) {
        toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "You must have a profile to create a project.",
        });
        router.push('/profile/create');
        return;
    }

    if (existingProject) {
        // Update existing project
        const projectIndex = projects.findIndex(p => p.id === existingProject.id);
        if (projectIndex !== -1) {
            projects[projectIndex] = {
                ...projects[projectIndex],
                name: data.projectName,
                description: data.description,
                longDescription: data.longDescription,
                requiredSkills: data.requiredSkills.split(',').map(s => s.trim()),
                teamSize: data.teamSize[0],
                compensation: data.compensation,
                equitySplit: data.equitySplit,
                incentives: data.incentives,
            };
        }
    } else {
        // Create new project
        const newProject = {
            id: `proj-${Date.now()}`,
            name: data.projectName,
            description: data.description,
            longDescription: data.longDescription,
            requiredSkills: data.requiredSkills.split(',').map(s => s.trim()),
            teamSize: data.teamSize[0],
            ownerId: currentUser.id,
            imageUrl: `https://picsum.photos/seed/proj-${Date.now()}/600/400`,
            imageHint: 'startup office',
            compensation: data.compensation,
            equitySplit: data.equitySplit,
            incentives: data.incentives,
            saved: false,
        };
        projects.push(newProject);
    }
    
    console.log(data);
    toast({
      title: `Project ${existingProject ? 'Updated' : 'Posted'}!`,
      description: `Your project is now ${existingProject ? 'updated' : 'live for collaborators to discover'}.`,
    });
    router.push("/discover");
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">{existingProject ? 'Edit' : 'Post a New'} Project</CardTitle>
          <CardDescription>
            Describe your project and the skills you're looking for to find the perfect collaborators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="projectName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., EcoTrack" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="A brief, one-sentence pitch for your project that will appear on cards."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="longDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a detailed overview of your project, its goals, and current status."
                        rows={6}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="requiredSkills"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Required Skills</FormLabel>
                    <FormControl>
                      <Input placeholder="React Native, Firebase, UI/UX Design..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter the skills you need, separated by commas.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ideal Team Size: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={10}
                        step={1}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="compensation"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Compensation Structure</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="paid" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Paid contract
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="equity" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Equity-based
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="partnership" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Partnership / Rev-share
                          </FormLabel>
                        </FormItem>
                         <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="co-founder" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Join as a Co-founder (equity only)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("compensation") === "equity" && (
                <FormField
                  control={form.control}
                  name="equitySplit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Equity Split Details</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., 5% vested over 4 years" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
                <FormField
                  control={form.control}
                  name="incentives"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Incentives (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., $5000 bonus on MVP launch" {...field} />
                      </FormControl>
                      <FormDescription>
                        Any performance bonuses or other incentives.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit">{existingProject ? 'Update' : 'Post'} Project</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
