import React, { useState, useEffect } from "react";
import useSession from "../hooks/useSession";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";
import { ChatMessage } from "../types/chat";
import { wsService } from "../services/websocketService";

const ChatPage: React.FC = () => {
  const { displayName, roomId, connectionStatus, displayNameSet } =
    useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    if (!displayNameSet) {
      return;
    }

    // Only connect if not already connected
    if (!wsService.isConnected()) {
      wsService.connect().catch((error) => {
        console.error("Failed to connect:", error);
      });
    }

    // Subscribe to messages
    const unsubscribeMessages = wsService.onMessage((message: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup
    return () => {
      unsubscribeMessages();
    };
  }, [displayNameSet]);

  // Don't show chat until display name is set
  if (!displayNameSet) {
    return null;
  }

  const getStatusColor = () => {
    switch (connectionStatus) {
      case "connected":
        return "bg-green-500";
      case "connecting":
        return "bg-yellow-500";
      case "disconnected":
        return "bg-red-500";
      case "error":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-full px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-sm">
                {roomId.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-gray-800">
                  #{roomId}
                </h1>
                <p className="text-xs text-gray-500">{displayName}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div
                className={`w-2.5 h-2.5 rounded-full ${getStatusColor()} animate-pulse`}
              ></div>
              <span className="text-xs font-medium text-gray-600 capitalize">
                {connectionStatus}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gradient-to-b from-blue-50 to-white p-4 flex flex-col-reverse">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full flex-col gap-4">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-gray-600 font-medium">No messages yet</p>
              <p className="text-gray-400 text-sm">Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 px-2 sm:px-4">
            <ChatMessages messages={messages} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4 sm:p-6">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatPage;
