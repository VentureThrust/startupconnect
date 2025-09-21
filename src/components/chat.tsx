
"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  icon?: React.ElementType;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="space-y-4 pr-4 h-80 overflow-y-auto">
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            "flex items-start gap-3",
            message.role === "user" ? "justify-end" : "justify-start"
          )}
        >
          {message.role === "assistant" && message.icon && (
             <Avatar className="h-8 w-8">
                <AvatarFallback>
                    <message.icon />
                </AvatarFallback>
            </Avatar>
          )}
          <div
            className={cn(
              "rounded-lg p-3 text-sm",
              message.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted"
            )}
          >
            {message.content}
          </div>
           {message.role === "user" && message.icon && (
             <Avatar className="h-8 w-8">
                <AvatarFallback>
                    <message.icon />
                </AvatarFallback>
            </Avatar>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, placeholder }) => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder={placeholder || "Type a message..."}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1"
      />
      <Button type="button" size="icon" onClick={handleSend}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

