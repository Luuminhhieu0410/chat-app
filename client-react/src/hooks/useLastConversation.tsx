import { LastConversationContext } from "@/context/LastUserChatContext";
import { useContext } from "react";

export const useLastConversation = () => {
  const context = useContext(LastConversationContext);
  return context; 
};
