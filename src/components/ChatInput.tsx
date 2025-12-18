import React, { useState } from "react";
import useSession from "../hooks/useSession";
import { wsService } from "../services/websocketService";
import { ChatMessage } from "../types/chat";
import "../styles/ChatInput.css";

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { userId, displayName, roomId } = useSession();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };

  const buildMessage = (): ChatMessage => {
    return {
      userId: userId as string,
      displayName,
      roomId,
      type: "CHAT",
      content: message.trim(),
      timestamp: Date.now(),
    };
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!message.trim()) {
      return;
    }

    setIsLoading(true);

    try {
      const chatMessage = buildMessage();
      wsService.sendMessage(chatMessage);

      // Clear input
      setMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <form className="chat-input-container" onSubmit={handleSendMessage}>
      <div className="input-wrapper">
        <input
          type="text"
          className="message-input"
          placeholder="Type a message..."
          value={message}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="send-button"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner">⌛</span>
          ) : (
            <span className="send-icon">➤</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default ChatInput;
