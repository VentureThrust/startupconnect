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
import { useRouter } from "next/navigation";
import { Slider } from "@/components/ui/slider";

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
});

type ProjectFormValues = z.infer<typeof projectFormSchema>;

export default function CreateProjectPage() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      projectName: "",
      description: "",
      longDescription: "",
      requiredSkills: "",
      teamSize: [2],
    },
    mode: "onChange",
  });

  function onSubmit(data: ProjectFormValues) {
    console.log(data);
    toast({
      title: "Project Posted!",
      description: "Your project is now live for collaborators to discover.",
    });
    router.push("/");
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Post a New Project</CardTitle>
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

              <Button type="submit">Post Project</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
