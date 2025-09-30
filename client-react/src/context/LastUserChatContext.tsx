import { Conversation } from "@/types/Message.type";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ContextType = {
  lastConversation: Conversation | null;
  setLastConversation: React.Dispatch<React.SetStateAction<Conversation | null>>;
};

const initValue: Conversation = {
  id: -999,
  name: "",
  lastMessage: "",
  avatarSrc: "",
  unreadCount: 0,
  timeAgo: "",
  isOnline: false,
};


export const LastConversationContext = createContext<ContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const LastConversationProvider = ({ children }: UserProviderProps) => {
  const [lastConversation, setLastConversation] = useState<Conversation | null>(initValue);

  useEffect(() => {
    const store = localStorage.getItem("lastConversation"); 
    if (store) {
      try {
        setLastConversation(JSON.parse(store));
      } catch (e) {
        console.log(e);
      }
    }
  }, []);

  return (
    <LastConversationContext.Provider value={{ lastConversation, setLastConversation }}>
      {children}
    </LastConversationContext.Provider>
  );
};



