import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Search, Settings, Menu } from "lucide-react";
import ConversationItem from "./ConversationItem";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SidebarSkeleton from "@/skeletons/SidebarSkeleton";

interface SidebarProps {
  conversations: Array<{
    id: string;
    name: string;
    lastMessage: string;
    avatarSrc: string;
    unreadCount?: number;
    timeAgo: string;
    isOnline?: boolean;
  }>;
  isLoadingConversation: boolean;
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  isLoadingConversation,
  activeConversationId,
  onSelectConversation,
  isOpen,
  onClose,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 w-full md:w-80 bg-card border-r transition-transform duration-300 ease-in-out",
        "md:relative md:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-semibold">Messages</h2>{" "}
        {/* Changed title */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={onClose}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5 text-muted-foreground" />{" "}
            {/* Added settings icon */}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search conversations..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {isLoadingConversation ? (
        <SidebarSkeleton />
      ) : (
        <ScrollArea className="h-[calc(100vh-120px)] px-4 pb-4">
          <div className="space-y-2">
            {conversations
              ? filteredConversations.map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    {...conv}
                    isActive={conv.id === activeConversationId}
                    onClick={(id) => {
                      onSelectConversation(id);
                      onClose();
                    }}
                  />
                ))
              : "Không lấy được dữ liệu"}
          </div>
        </ScrollArea>
      )}
    </aside>
  );
};

export default Sidebar;
