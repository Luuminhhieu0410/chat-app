import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { API } from "@/utils/apiclient";
import { useUserStore } from "@/stores/UserStore";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  avatarSrc: string;
  unreadCount: number;
  timeAgo: string | null;
  isOnline: boolean;
}

interface Message {
  id: string;
  text: string;
  timestamp: string;
  isSender: boolean;
  avatarSrc?: string;
  avatarFallback?: string;
}

const ChatLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadConversation, setIsLoadingConversation] =
    useState<boolean>(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const { access_token } = useUserStore();
  // console.log('token' + access_token);

  // load conversations (sidebar)
  useEffect(() => {
    const fetchConversations = async () => {
      const api = new API();
      api.setToken(access_token);
      const data = await api.get("/api/user/conversations");
      // console.log("-----", data);
      setConversations(data);
      setIsLoadingConversation(false);
      // if (data.length > 0 && !activeConversationId) {
      //   setActiveConversationId(data[0].id);
      // }
    };
    setTimeout(() => {
      fetchConversations();
    }, 2000);
  }, []);

  // load messages khi đổi conversation
  useEffect(() => {
    if (!activeConversationId) return;
    const fetchMessages = async () => {
      const res = await fetch(`/api/messages/${activeConversationId}`);
      const data = await res.json();
      setCurrentMessages(data);
      setIsTyping(false);
    };
    fetchMessages();
  }, [activeConversationId]);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  // gửi tin nhắn
  const handleSendMessage = async (messageText: string) => {
    if (!activeConversationId) return;

    const newMessage: Message = {
      id: `temp-${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isSender: true,
    };
    setCurrentMessages((prev) => [...prev, newMessage]);

    await fetch(`/api/messages/${activeConversationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: messageText }),
    });

    // refresh lại messages
    const res = await fetch(`/api/messages/${activeConversationId}`);
    setCurrentMessages(await res.json());
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <Sidebar
          isLoadingConversation={isLoadConversation}
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Chat Area */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          isMobile && isSidebarOpen ? "hidden" : "flex"
        )}
      >
        {
          activeConversation && (
            <>
              <ChatHeader
                chatName={activeConversation.name}
                chatAvatarSrc={activeConversation.avatarSrc}
                membersCount={2} // tuỳ chỉnh sau
                onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
              />
              <MessageList messages={currentMessages} isTyping={isTyping} />
              <ChatInput onSendMessage={handleSendMessage} />
            </>
          )
          // : (
          //   <div className="flex flex-1 items-center justify-center text-muted-foreground">
          //     Select a conversation to start chatting.
          //   </div>
          // )
        }
      </div>
    </div>
  );
};

export default ChatLayout;
