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
import { generateProfileQuestions } from "@/ai/flows/generate-profile-questions";
import { useState } from "react";
import { Loader } from "lucide-react";

const profileFormSchema = z.object({
  startupName: z.string().min(2, {
    message: "Startup name must be at least 2 characters.",
  }),
  description: z.string().max(300, {
    message: "Description must not be longer than 300 characters.",
  }).min(10, {
    message: "Description must be at least 10 characters.",
  }),
  skills: z.string().min(1, { message: "Please enter at least one skill." }),
  experience: z.string().min(20, { message: "Please describe your experience in at least 20 characters." }),
  productDetails: z.string().min(20, { message: "Please describe your product in at least 20 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [questions, setQuestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      startupName: "",
      description: "",
      skills: "",
      experience: "",
      productDetails: "",
    },
    mode: "onChange",
  });

  async function getQuestions() {
    setLoading(true);
    const result = await generateProfileQuestions();
    setQuestions(result.questions);
    setLoading(false);
  }

  function onSubmit(data: ProfileFormValues) {
    console.log(data);
    toast({
      title: "Profile Created!",
      description: "Your profile has been successfully created. You can now explore projects.",
    });
    router.push("/profile");
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create Your Profile</CardTitle>
          <CardDescription>
            Tell us about yourself, your startup, and your skills. This will help others connect with you.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!questions.length && (
            <div className="text-center">
              <p className="mb-4">Let our AI guide you through creating your profile.</p>
              <Button onClick={getQuestions} disabled={loading}>
                {loading && <Loader className="mr-2 animate-spin" />}
                Start with AI
              </Button>
            </div>
          )}
          {questions.length > 0 && (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="startupName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{questions[0] || 'Startup Name'}</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Nexus Start" {...field} />
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
                      <FormLabel>{questions[1] || 'What does your startup do?'}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="A brief, one-sentence pitch for your startup."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{questions[2] || 'Your Skills'}</FormLabel>
                      <FormControl>
                        <Input placeholder="React, Node.js, UI/UX Design..." {...field} />
                      </FormControl>
                      <FormDescription>
                        Enter your skills, separated by commas.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{questions[3] || 'Your Previous Experience'}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your background, previous roles, and key achievements."
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{questions[4] || "About the Product You're Building"}</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="What is your product? What problem does it solve? What's the current stage (MVP, idea, etc.)?"
                          rows={5}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Create Profile</Button>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
