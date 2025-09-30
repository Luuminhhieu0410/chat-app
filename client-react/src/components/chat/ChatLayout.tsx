import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import { useUserStore } from "@/stores/UserStore";
import { Conversation, Message } from "@/types/Message.type";
import { useAPI } from "../../hooks/useAPI";
import useSocket from "@/hooks/useSocket";


const ChatLayout: React.FC = () => {
  const lastUserChat = JSON.parse(localStorage.getItem("lastUserChat"));
  let idLastUser ;
  if(!lastUserChat) {idLastUser = null}
  else idLastUser = lastUserChat.id

  const isMobile = useIsMobile();
  const { get, setToken, post } = useAPI();
  const { access_token, id: userId } = useUserStore();
  const {socket} = useSocket();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoadConversation, setIsLoadingConversation] = useState<boolean>(true);
  const [isLoadingChat, setIsLoadingChat] = useState<boolean>(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<number | null>(idLastUser);
  const [currentMessages, setCurrentMessages] = useState<Message[]>([]);

  const roomId = [userId, activeConversationId].sort().join("_"); // tạo id room
  // load conversations (sidebar)
  useEffect(() => {
    const fetchConversations = async () => {
      setToken(access_token);
      const data = await get("/api/user/conversations");
      setConversations(data);
      setIsLoadingConversation(false);
      if (data.length > 0 && !activeConversationId) {
        setActiveConversationId(data[0].id);
      }
    };
    setTimeout(() => {
      fetchConversations();
    }, 2000);
  }, []);

  // load messages khi đổi conversation
  useEffect(() => {
    setIsLoadingChat(true);

    if (!activeConversationId) return;

    const controller = new AbortController();
    const loadMessages = async () => {
      try {
        const messages: Message[] = await get(
          `/api/message/conversation/${activeConversationId}`,
          { signal: controller.signal }
        );
        setCurrentMessages(messages);
        setIsLoadingChat(false);
      } catch (err) {
        console.log("Request cancelled");
      }
    };

    const timer = setTimeout(() => {
      loadMessages();
    }, 1000);

    return () => {
      controller.abort(); // huỷ request khi đổi conversation 
      clearTimeout(timer);
    };
  }, [activeConversationId, get]);

  const activeConversation = conversations.find(
    (c) => c.id === activeConversationId
  );

  // gửi tin nhắn
  const handleSendMessage = async (messageText: string) => {
    if (!activeConversationId) return;

    const fetchMessage = async () => {
      setToken(access_token);
      const messagePost: Message = await post(
        `/api/message/send/${activeConversationId}`,
        { message: messageText },
        { headers: { "Content-Type": "application/json" } }
      );

      // cập nhật local
      setCurrentMessages((prev) => [...prev, messagePost]);

      // emit socket cho realtime
      socket.emit("send-message", {
        roomId: roomId,
        message: {
          ...messagePost,
          sender_id: userId,
        },
      });
    };

    fetchMessage();
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {(isSidebarOpen || !isMobile) && (
        <Sidebar
          isLoadingConversation={isLoadConversation}
          conversations={conversations}
          activeConversation={activeConversation}
          setActiveConversationId={setActiveConversationId}
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
        {activeConversation && (
          <>
            <ChatHeader
              chatName={activeConversation.name}
              chatAvatarSrc={activeConversation.avatarSrc}
              membersCount={2} // TODO: sửa cho dynamic
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <MessageList
              roomId={roomId} // truyền roomId
              messages={currentMessages}
              isLoadingChat={isLoadingChat}
              setMessages={setCurrentMessages} // dể socket có thể push message
            />
            <ChatInput onSendMessage={handleSendMessage} roomId={roomId} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
