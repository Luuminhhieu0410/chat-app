import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Conversation, Message } from "@/types/Message.type";
import { useUserStore } from "@/stores/UserStore";

interface MessageListProps {
  messages: Message[];

}

const MessageList: React.FC<MessageListProps> = ({ messages}) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <ScrollArea className="flex-1 p-4 space-y-4" ref={scrollAreaRef}>
      {messages.map((msg) => (
        <MessageBubble
          id={msg.id}
          sender_id={msg.sender_id}
          receiver_id={msg.receiver_id}
          message={msg.message}
          is_read={msg.is_read}
          message_type={msg.message_type}
          created_at={msg.created_at}
        />
      ))}

      <div className="flex justify-start items-end gap-2">
        {" "}
        {/* Added items-end and gap-2 */}
        <Avatar className="h-8 w-8">
          {" "}
          {/* Typing indicator avatar */}
          <AvatarImage
            src="https://api.dicebear.com/7.x/lorelei/svg?seed=Bot"
            alt="Bot"
          />
          <AvatarFallback>B</AvatarFallback>
        </Avatar>
        <div className="bg-chat-receiver-bubble text-foreground p-3 rounded-lg rounded-bl-none max-w-[70%] flex items-center gap-2">
          {" "}
          {/* Use custom receiver color */}
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Typing...</span>
        </div>
      </div>
    </ScrollArea>
  );
};

export default MessageList;
