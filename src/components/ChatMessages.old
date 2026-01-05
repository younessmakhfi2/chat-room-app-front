import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../types/chat";
import useSession from "../hooks/useSession";
import "../styles/ChatMessages.css";

interface ChatMessagesProps {
  messages: ChatMessage[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { userId } = useSession();

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getInitials = (displayName: string): string => {
    return displayName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (displayName: string): string => {
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA07A",
      "#98D8C8",
      "#F7DC6F",
      "#BB8FCE",
      "#85C1E2",
    ];
    const index = displayName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <div className="chat-messages-container">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p className="empty-title">No messages yet</p>
          <p className="empty-subtitle">Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg, index) => {
          const isOwnMessage = msg.userId === userId;
          const previousMsg = index > 0 ? messages[index - 1] : null;
          const showAvatar = !previousMsg || previousMsg.userId !== msg.userId;

          return (
            <div
              key={index}
              className={`message-group ${
                isOwnMessage ? "own-message" : "other-message"
              }`}
            >
              {!isOwnMessage && showAvatar && (
                <div
                  className="message-avatar"
                  style={{ backgroundColor: getAvatarColor(msg.displayName) }}
                >
                  {getInitials(msg.displayName)}
                </div>
              )}

              <div className="message-content">
                {showAvatar && (
                  <div className="message-header">
                    <span className="message-name">{msg.displayName}</span>
                    <span className="message-time">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                )}

                <div
                  className={`message-bubble ${
                    isOwnMessage ? "own-bubble" : "other-bubble"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
