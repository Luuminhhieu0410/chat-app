import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Smile, Paperclip, Send, Mic } from "lucide-react"; // Added Mic icon

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = React.useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex items-center p-4 border-t bg-card gap-2">
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Input
        placeholder="Type a message..."
        className="flex-1"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button variant="ghost" size="icon">
        <Smile className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button variant="ghost" size="icon">
        <Mic className="h-5 w-5 text-muted-foreground" />
      </Button>
      <Button onClick={handleSend} disabled={!message.trim()} size="icon"> {/* Send button as icon only */}
        <Send className="h-5 w-5" />
        <span className="sr-only">Send message</span>
      </Button>
    </div>
  );
};

export default ChatInput;