import React, { useState, useEffect } from "react";
import useSession from "../hooks/useSession";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { ChatMessage } from "../types/chat";
import { wsService } from "../services/websocketService";
import "../styles/ChatPage.css";

const ChatPage: React.FC = () => {
  const { displayName, roomId, connectionStatus, displayNameSet } =
    useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!displayNameSet) {
      return;
    }

    // Connect to WebSocket
    wsService.connect().catch((error) => {
      console.error("Failed to connect:", error);
    });

    // Subscribe to messages
    const unsubscribeMessages = wsService.onMessage((message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup
    return () => {
      unsubscribeMessages();
      wsService.disconnect();
    };
  }, [displayNameSet]);

  // Don't show chat until display name is set
  if (!displayNameSet) {
    return null;
  }

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <div className="header-left">
          <h1 className="room-title">#{roomId}</h1>
          <p className="room-description">Welcome, {displayName}!</p>
        </div>

        <div className="header-right">
          <div className="connection-indicator">
            <span
              className={`status-dot status-${connectionStatus}`}
              title={connectionStatus}
            ></span>
            <span className="status-text">{connectionStatus}</span>
          </div>
        </div>
      </div>

      <ChatMessages messages={messages} />

      <ChatInput />
    </div>
  );
};

export default ChatPage;
