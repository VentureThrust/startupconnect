
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ChatInput, ChatMessages, type Message } from "@/components/chat";
import { User, Bot } from "lucide-react";
import { users } from "@/lib/data";

const profileQuestions = [
    "What's your full name?",
    "What's the name of your startup?",
    "What college/university do you attend (or did you attend)?",
    "Give me a short, one-sentence pitch for your startup.",
    "What are your key skills? (e.g., React, UI/UX Design, Marketing)",
    "Briefly describe your professional experience and background.",
    "Tell me about the product you are building. What problem does it solve?",
];

const profileSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  startupName: z.string().min(2, "Please enter your startup's name."),
  college: z.string().optional(),
  description: z.string().min(10, "Your pitch should be at least 10 characters."),
  skills: z.string().min(1, "Please list at least one skill."),
  experience: z.string().min(20, "Please provide more details about your experience."),
  productDetails: z.string().min(20, "Please provide more details about your product."),
});

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm here to help you create your profile. Let's start with the first question: " + profileQuestions[0],
      role: "assistant",
      icon: Bot
    }
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  
  const form = useForm<z.infer<typeof profileSchema>>({
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
    const userMessage: Message = {
      id: String(Date.now()),
      content: message,
      role: 'user',
      icon: User,
    };
    setMessages((prev) => [...prev, userMessage]);

    const fieldName = Object.keys(profileSchema.shape)[currentQuestionIndex] as keyof z.infer<typeof profileSchema>;
    form.setValue(fieldName, message);

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < profileQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
      const botMessage: Message = {
        id: String(Date.now() + 1),
        content: profileQuestions[nextQuestionIndex],
        role: "assistant",
        icon: Bot
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      setIsComplete(true);
      const botMessage: Message = {
        id: String(Date.now() + 1),
        content: "Great! Your profile is complete. Please review and save it.",
        role: "assistant",
        icon: Bot
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };
  
  function onSubmit(data: z.infer<typeof profileSchema>) {
    const newUserProfile = {
      id: `user-${Date.now()}`,
      avatarUrl: `https://picsum.photos/seed/${data.name}/100/100`,
      name: data.name,
      startupName: data.startupName,
      college: data.college,
      description: data.description,
      skills: data.skills.split(',').map(s => s.trim()),
      experience: data.experience,
      productDetails: data.productDetails,
    };
    
    // This is a mock implementation. In a real app, you'd save this to a database.
    // We are replacing any existing user data with this new profile.
    users.splice(0, users.length, newUserProfile);

    toast({
      title: "Profile Created!",
      description: "Your profile has been successfully created. You will be redirected to the discover page.",
    });
    router.push("/discover");
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create Your Profile</CardTitle>
          <CardDescription>
            Answer a few questions to build your profile with our AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChatMessages messages={messages} />
            {!isComplete ? (
              <ChatInput
                onSendMessage={handleSendMessage}
                placeholder="Type your answer..."
              />
            ) : (
              <Button onClick={form.handleSubmit(onSubmit)} className="w-full">
                Save Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
