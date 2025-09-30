import React from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Import Avatar components
import { Message } from "@/types/Message.type";
import { useUserStore } from "@/stores/UserStore";
import { useLastConversation } from "@/hooks/useLastConversation";
import { server } from "@/utils/server";
const MessageBubble: React.FC<Message> = ({
id : messageId,
sender_id,
receiver_id,
message,
is_read,
message_type,
created_at
}) => {
  const {id} =  useUserStore();
  const isSender: boolean =  id === sender_id;
  const {lastConversation , setLastConversation} = useLastConversation();
  return (
    <div
      className={cn(
        "flex w-full items-end gap-2", 
        isSender ? "justify-end" : "justify-start"
      )}
    >
      {!isSender &&
        lastConversation && ( 
          <Avatar className="h-8 w-8">
            <AvatarImage src={server.baseUrlImage + `/${lastConversation.avatarSrc}`} />
            <AvatarFallback>{lastConversation.name?.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-lg shadow-sm",
          isSender
            ? "bg-chat-sender-bubble text-primary-foreground rounded-br-none" 
            : "bg-chat-receiver-bubble text-foreground rounded-bl-none" 
        )}
      >
        <p className="text-sm break-words">{message}</p>
        <span
          className={cn(
            "block text-xs mt-1",
            isSender ? "text-primary-foreground/80" : "text-muted-foreground",
            "text-right"
          )}
        >
          { new Date(created_at).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
  