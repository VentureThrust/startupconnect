
"use client";

import { useState, useEffect, useRef } from "react";
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
  name: z.string().min(2),
  startupName: z.string().min(2),
  college: z.string().optional(),
  description: z.string().min(10),
  skills: z.string().min(1),
  experience: z.string().min(20),
  productDetails: z.string().min(20),
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
  const [profileData, setProfileData] = useState<z.infer<typeof profileSchema>>({
    name: "",
    startupName: "",
    college: "",
    description: "",
    skills: "",
    experience: "",
    productDetails: "",
  });

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData,
  });

  const handleSendMessage = async (message: string) => {
    // Add user message to chat
    const userMessage: Message = {
      id: String(Date.now()),
      content: message,
      role: 'user',
      icon: User,
    };
    setMessages((prev) => [...prev, userMessage]);

    // Update profile data
    const fieldName = Object.keys(profileSchema.shape)[currentQuestionIndex] as keyof typeof profileData;
    const newProfileData = { ...profileData, [fieldName]: message };
    setProfileData(newProfileData);
    form.setValue(fieldName, message);

    // Ask next question or complete profile
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
        content: "Great! Your profile is complete. You can now save it.",
        role: "assistant",
        icon: Bot
      };
      setMessages((prev) => [...prev, botMessage]);
    }
  };
  
  function onSubmit() {
    // This is a mock implementation. In a real app, you'd save this to a database.
    const newUserProfile = {
      id: `user-${Date.now()}`,
      avatarUrl: `https://picsum.photos/seed/${profileData.name}/100/100`,
      name: profileData.name,
      startupName: profileData.startupName,
      college: profileData.college,
      description: profileData.description,
      skills: profileData.skills.split(',').map(s => s.trim()),
      experience: profileData.experience,
      productDetails: profileData.productDetails,
    };
    
    // For demonstration, we'll replace the existing user or add a new one.
    if (users.length > 0) {
        users[0] = newUserProfile;
    } else {
        users.push(newUserProfile);
    }
    
    console.log(users);

    toast({
      title: "Profile Created!",
      description: "Your profile has been successfully created. You can now explore projects.",
    });
    router.push("/discover");
  }

  return (
    <div className="container mx-auto max-w-2xl py-12 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Create Your Profile</CardTitle>
          <CardDescription>
            Answer a few questions to build your profile.
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
              <Button onClick={onSubmit} className="w-full">
                Save Profile
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
