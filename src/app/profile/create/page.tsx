
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChatInput, ChatMessages, type Message } from "@/components/chat";
import { User, Bot } from "lucide-react";
import { users } from "@/lib/data";

const profileQuestions = [
    "Welcome to Nexus Start! I'm here to help you build your profile. First, what's your full name?",
    "Great! Now, what's the name of your startup or project idea?",
    "What college/university do you attend (or did you recently graduate from)?",
    "Give me a short, one-sentence pitch for your startup.",
    "What are your key skills? Please list them, separated by commas (e.g., React, UI/UX Design, Marketing).",
    "Briefly describe your professional experience or any relevant background.",
    "Finally, tell me more about the product you are building. What problem does it solve?",
];

const profileSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  startupName: z.string().min(2, "Please enter your startup's name."),
  college: z.string().min(2, "Please enter your college."),
  description: z.string().min(10, "Your pitch should be at least 10 characters."),
  skills: z.string().min(1, "Please list at least one skill."),
  experience: z.string().min(20, "Please provide more details about your experience."),
  productDetails: z.string().min(20, "Please provide more details about your product."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: profileQuestions[0],
      role: "assistant",
      icon: Bot
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      startupName: "",
      college: "",
      description: "",
      skills: "",
      experience: "",
      productDetails: "",
    },
  });

  const handleSendMessage = async (message: string) => {
    if (isComplete) return;

    const userMessage: Message = {
      id: String(Date.now()),
      content: message,
      role: 'user',
      icon: User,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Programmatically set the form value for the current question
    const fieldName = Object.keys(profileSchema.shape)[currentQuestionIndex] as keyof ProfileFormValues;
    form.setValue(fieldName, message);
    form.trigger(fieldName); // Trigger validation for the field

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < profileQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      // Give a slight delay for a more natural chat flow
      setTimeout(() => {
        const botMessage: Message = {
            id: String(Date.now() + 1),
            content: profileQuestions[nextQuestionIndex],
            role: "assistant",
            icon: Bot
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    } else {
      setIsComplete(true);
      setTimeout(() => {
        const botMessage: Message = {
            id: String(Date.now() + 1),
            content: "Excellent! That's all I need. Please review and save your profile to continue.",
            role: "assistant",
            icon: Bot
        };
        setMessages((prev) => [...prev, botMessage]);
      }, 500);
    }
  };
  
  function onSubmit(data: ProfileFormValues) {
    const newUserProfile = {
      id: `user-${Date.now()}`,
      avatarUrl: `https://picsum.photos/seed/${data.name.split(' ').join('')}/100/100`,
      name: data.name,
      startupName: data.startupName,
      college: data.college,
      description: data.description,
      skills: data.skills.split(',').map(s => s.trim()),
      experience: data.experience,
      productDetails: data.productDetails,
    };
    
    // Replace any existing user data with this new profile.
    // This simulates a single-user login session.
    users.splice(0, users.length, newUserProfile);

    toast({
      title: "Profile Created!",
      description: "Welcome to Nexus Start. You can now discover and create projects.",
    });

    // Redirect to the discover page to start using the app
    router.push("/discover");
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Let's Build Your Profile</CardTitle>
          <CardDescription>
            Answer a few questions with our AI assistant to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChatMessages messages={messages} />
            
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                {!isComplete ? (
                  <ChatInput
                    onSendMessage={handleSendMessage}
                    placeholder="Type your answer..."
                  />
                ) : (
                  <Button type="submit" className="w-full">
                    Save Profile and Continue
                  </Button>
                )}
              </form>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
