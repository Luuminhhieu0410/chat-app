import React from "react";
import Sidebar from "./Sidebar";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

// Mock Data
const mockConversations = [
  {
    id: "1",
    name: "Sarah Chen",
    lastMessage: "Hey! How is the project going?",
    avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah",
    unreadCount: 2,
    timeAgo: "2m",
    isOnline: true,
  },
  {
    id: "2",
    name: "Design Team",
    lastMessage: "Michael: I like the new mockups",
    avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=DesignTeam",
    unreadCount: 0,
    timeAgo: "5m",
    isOnline: true,
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    lastMessage: "Perfect! Let me know when you ar...",
    avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex",
    unreadCount: 0,
    timeAgo: "1h",
    isOnline: false,
  },
  {
    id: "4",
    name: "Emma Watson",
    lastMessage: "Thanks for the quick turnaround!",
    avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma",
    unreadCount: 1,
    timeAgo: "3h",
    isOnline: false,
  },
];

const mockMessages = {
  "1": [
    { id: "m1", text: "Hi Sarah!", timestamp: "10:00 AM", isSender: true },
    { id: "m2", text: "Hey! I'm good, how about you?", timestamp: "10:01 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah", avatarFallback: "S" },
    { id: "m3", text: "I'm doing great, thanks for asking!", timestamp: "10:05 AM", isSender: true },
    { id: "m4", text: "Just wanted to check in.", timestamp: "10:06 AM", isSender: true },
    { id: "m5", text: "That's nice of you! Everything's fine here.", timestamp: "10:07 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sarah", avatarFallback: "S" },
  ],
  "2": [
    { id: "m6", text: "Hey! How is the project going?", timestamp: "10:30 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=DesignTeam", avatarFallback: "D" },
    { id: "m7", text: "It's going really well! I just finished the design mockups.", timestamp: "10:32 AM", isSender: true },
    { id: "m8", text: "That's awesome! Can you share them with the team?", timestamp: "10:33 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=DesignTeam", avatarFallback: "D" },
    { id: "m9", text: "Absolutely! I'll upload them to the shared folder right now. The new color scheme looks much better than the previous version.", timestamp: "10:35 AM", isSender: true },
    { id: "m10", text: "Perfect! I'll review them this afternoon and give you feedback.", timestamp: "10:37 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=DesignTeam", avatarFallback: "D" },
  ],
  "3": [
    { id: "m11", text: "Hey Alex, about the report...", timestamp: "09:30 AM", isSender: true },
    { id: "m12", text: "Yes, it's still on for 3 PM.", timestamp: "09:35 AM", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Alex", avatarFallback: "A" },
  ],
  "4": [
    { id: "m13", text: "Emma, did you send the report?", timestamp: "Yesterday", isSender: true },
    { id: "m14", text: "Almost done, will send it by EOD.", timestamp: "Yesterday", isSender: false, avatarSrc: "https://api.dicebear.com/7.x/lorelei/svg?seed=Emma", avatarFallback: "E" },
  ],
};

const ChatLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [activeConversationId, setActiveConversationId] = React.useState<string | null>(
    mockConversations[0]?.id || null,
  );
  const [currentMessages, setCurrentMessages] = React.useState<any[]>(
    activeConversationId ? (mockMessages as any)[activeConversationId] : [],
  );
  const [isTyping, setIsTyping] = React.useState(false);

  React.useEffect(() => {
    if (activeConversationId) {
      setCurrentMessages((mockMessages as any)[activeConversationId] || []);
      setIsTyping(false); // Reset typing indicator when conversation changes
    }
  }, [activeConversationId]);

  const activeConversation = mockConversations.find(
    (conv) => conv.id === activeConversationId,
  );

  const handleSendMessage = (messageText: string) => {
    if (!activeConversationId) return;

    const newMessage = {
      id: `m${Date.now()}`,
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isSender: true,
    };

    setCurrentMessages((prevMessages) => [...prevMessages, newMessage]);

    // Simulate a response after a short delay
    setIsTyping(true);
    setTimeout(() => {
      const botResponse = {
        id: `m${Date.now() + 1}`,
        text: `Thanks for your message: "${messageText}"!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSender: false,
        avatarSrc: activeConversation?.avatarSrc, // Use active conversation's avatar for bot
        avatarFallback: activeConversation?.name.charAt(0),
      };
      setCurrentMessages((prevMessages) => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for desktop, overlay for mobile */}
      {(isSidebarOpen || !isMobile) && (
        <Sidebar
          conversations={mockConversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Chat Area */}
      <div
        className={cn(
          "flex flex-col flex-1 transition-all duration-300 ease-in-out",
          isMobile && isSidebarOpen ? "hidden" : "flex", // Hide main chat when sidebar is open on mobile
        )}
      >
        {activeConversation ? (
          <>
            <ChatHeader
              chatName={activeConversation.name}
              chatAvatarSrc={activeConversation.avatarSrc}
              membersCount={activeConversation.name === "Design Team" ? 5 : 2} // Example member count
              onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <MessageList messages={currentMessages} isTyping={isTyping} />
            <ChatInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="flex flex-1 items-center justify-center text-muted-foreground">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;