import React, { useEffect, useLayoutEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatSkeleton from "@/skeletons/ChatSkeleton";
import { Message } from "@/types/Message.type";
import useSocket from "@/hooks/useSocket";
import { ScrollAreaViewport } from "@radix-ui/react-scroll-area";

interface MessageListProps {
  messages: Message[];
  isLoadingChat: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  roomId: string;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  isLoadingChat,
  setMessages,
  roomId,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { socket } = useSocket();
  useEffect(() => {
    scrollAreaRef.current.scrollTop = 12000;
    console.log('...' + scrollAreaRef.current.scrollHeight)
    console.log('scroll');
  }, [messages, roomId]);

  useEffect(() => {
    console.log("room id (messagelist)" + roomId);
    socket.emit("send-room", roomId);

    socket.on("receive", (data: any) => {
      console.log("bên kia gửi : " + JSON.stringify(data));
      console.log("type of new message " + typeof data.created_at);
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive");
    };
  }, [roomId, setMessages]);

  return (
    <ScrollArea className="flex-1">
      <div ref={scrollAreaRef} className="p-4 space-y-4">
        {isLoadingChat ? (
          <ChatSkeleton />
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} {...msg} />)
        )}
      </div>
    </ScrollArea>
  );
};

export default MessageList;
