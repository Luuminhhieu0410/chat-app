import { LastConversationContext } from "@/context/LastUserChat";
import { useContext } from "react";

export const useLastConversation = () => {
  const context = useContext(LastConversationContext);
  return context; 
};
