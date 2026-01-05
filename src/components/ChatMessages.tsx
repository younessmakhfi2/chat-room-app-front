import React, { useEffect, useRef } from "react";
import { ChatMessage } from "../types/chat";
import useSession from "../hooks/useSession";

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
      "from-red-400 to-red-600",
      "from-blue-400 to-blue-600",
      "from-green-400 to-green-600",
      "from-purple-400 to-purple-600",
      "from-pink-400 to-pink-600",
      "from-yellow-400 to-yellow-600",
      "from-indigo-400 to-indigo-600",
      "from-cyan-400 to-cyan-600",
    ];
    const index = displayName.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <>
      {messages.map((msg, index) => {
        const isOwnMessage = msg.userId === userId;
        const previousMsg = index > 0 ? messages[index - 1] : null;
        const showAvatar = !previousMsg || previousMsg.userId !== msg.userId;

        return (
          <div
            key={index}
            className={`flex gap-2 sm:gap-3 ${
              isOwnMessage ? "justify-end" : "justify-start"
            } animate-in fade-in slide-in-from-bottom`}
          >
            {!isOwnMessage && showAvatar && (
              <div
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br ${getAvatarColor(
                  msg.displayName
                )} flex items-center justify-center text-white font-bold text-xs sm:text-sm flex-shrink-0`}
              >
                {getInitials(msg.displayName)}
              </div>
            )}

            <div
              className={`flex flex-col ${
                isOwnMessage ? "items-end" : "items-start"
              } gap-1 max-w-xs sm:max-w-md`}
            >
              {showAvatar && (
                <div className="flex gap-2 items-baseline px-2">
                  <span className="text-xs sm:text-sm font-semibold text-gray-700">
                    {msg.displayName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
              )}

              <div
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base break-words ${
                  isOwnMessage
                    ? "bg-blue-500 text-white rounded-br-none shadow-md"
                    : "bg-gray-200 text-gray-900 rounded-bl-none shadow-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </>
  );
};

export default ChatMessages;
