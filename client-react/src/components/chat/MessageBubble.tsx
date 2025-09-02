import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components

interface MessageBubbleProps {
  message: string;
  timestamp: string;
  isSender: boolean;
  avatarSrc?: string; // Optional avatar for receiver
  avatarFallback?: string; // Optional avatar fallback for receiver
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  timestamp,
  isSender,
  avatarSrc,
  avatarFallback,
}) => {
  return (
    <div
      className={cn(
        "flex w-full items-end gap-2", // Added items-end and gap-2 for avatar alignment
        isSender ? "justify-end" : "justify-start",
      )}
    >
      {!isSender && avatarSrc && ( // Display avatar for receiver
        <Avatar className="h-8 w-8">
          <AvatarImage src={avatarSrc} alt={avatarFallback} />
          <AvatarFallback>{avatarFallback?.charAt(0)}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-lg shadow-sm",
          isSender
            ? "bg-chat-sender-bubble text-primary-foreground rounded-br-none" // Use custom sender color
            : "bg-chat-receiver-bubble text-foreground rounded-bl-none", // Use custom receiver color
        )}
      >
        <p className="text-sm break-words">{message}</p>
        <span
          className={cn(
            "block text-xs mt-1",
            isSender ? "text-primary-foreground/80" : "text-muted-foreground",
            "text-right",
          )}
        >
          {timestamp}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;