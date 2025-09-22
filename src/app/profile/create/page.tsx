
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

];

// ✅ Relaxed schema for easier testing
const profileSchema = z.object({

  skills: z.string().min(1, "Please list at least one skill."),
  experience: z.string().min(1, "Please provide your experience."),
  productDetails: z.string().min(1, "Please provide your product details."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function CreateProfilePage() {
  const { toast } = useToast();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",

      role: "assistant",
      icon: Bot,
    },
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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
      role: "user",
      icon: User,
    };
    setMessages((prev) => [...prev, userMessage]);


    form.setValue(fieldName, message);
    form.trigger(fieldName); // Trigger validation for the field

    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < profileQuestions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);

    const newUserProfile = {
      id: `user-${Date.now()}`,
      avatarUrl: `https://picsum.photos/seed/${data.name.split(' ').join('')}/100/100`,
      name: data.name,
      startupName: data.startupName,
      college: data.college,
      description: data.description,
      skills: data.skills.split(",").map((s) => s.trim()),
      experience: data.experience,
      productDetails: data.productDetails,
    };

    users.splice(0, users.length, newUserProfile);

    console.log("✅ Submitted profile:", newUserProfile);

    toast({
      title: "Profile Created!",

    });

    // Redirect to the discover page to start using the app
    router.push("/discover");
  }

  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center py-12 px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>

          <CardDescription>
            Answer a few questions with our AI assistant to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ChatMessages messages={messages} />

              </form>
            </FormProvider>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
