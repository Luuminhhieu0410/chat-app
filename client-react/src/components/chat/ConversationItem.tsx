import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ConversationItemProps {
  id: string;
  name: string;
  lastMessage: string;
  avatarSrc: string;
  unreadCount?: number;
  isActive?: boolean;
  timeAgo: string;
  isOnline?: boolean;
  onClick: (id: string) => void;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  id,
  name,
  lastMessage,
  avatarSrc,
  unreadCount,
  isActive,
  timeAgo,
  isOnline,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        "hover:bg-muted/50",
        isActive && "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50", // Adjusted active background
      )}
      onClick={() => onClick(id)}
    >
      <div className="relative">
        <Avatar className="h-10 w-10">
          <AvatarImage src={avatarSrc} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
        )}
      </div>
      <div className="flex-1 overflow-hidden">
        <h3 className="font-medium text-sm truncate">{name}</h3>
        <p className="text-muted-foreground text-xs truncate">
          {lastMessage}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-xs text-muted-foreground">{timeAgo}</span>
        {unreadCount && unreadCount > 0 && (
          <Badge className="h-5 w-5 flex items-center justify-center p-0 rounded-full bg-blue-500 text-white text-xs">
            {unreadCount}
          </Badge>
        )}
      </div>
    </div>
  );
};

export default ConversationItem;