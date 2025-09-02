import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search, Menu, Phone, Video, MoreHorizontal } from "lucide-react"; // Added new icons
import { Button } from "@/components/ui/button";

interface ChatHeaderProps {
  chatName: string;
  chatAvatarSrc: string;
  membersCount: number; // Added membersCount prop
  onToggleSidebar: () => void;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  chatName,
  chatAvatarSrc,
  membersCount,
  onToggleSidebar,
}) => {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-card">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <Avatar className="h-10 w-10"> {/* Adjusted avatar size */}
          <AvatarImage src={chatAvatarSrc} alt={chatName} />
          <AvatarFallback>{chatName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-semibold text-lg">{chatName}</h2>
          <p className="text-muted-foreground text-xs">{membersCount} members</p> {/* Display member count */}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative w-48 hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search in conversation..." className="pl-9" />
        </div>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Phone className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon" className="hidden sm:inline-flex">
          <Video className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
};

export default ChatHeader;