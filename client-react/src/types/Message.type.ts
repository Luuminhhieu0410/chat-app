export interface Message { // messgae API
  id: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  is_read: false;
  message_type: string;
  created_at: string;
}

export interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  avatarSrc: string;
  unreadCount: number;
  timeAgo: string | null;
  isOnline: boolean;
}   