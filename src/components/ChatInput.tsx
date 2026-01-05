import React, { useState } from 'react';
import useSession from '../hooks/useSession';
import { wsService } from '../services/websocketService';
import { ChatMessage } from '../types/chat';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState<string>('');
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
      type: 'CHAT',
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
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <form onSubmit={handleSendMessage} className="flex gap-2 sm:gap-3">
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={isLoading}
        className="flex-1 px-4 py-2 sm:py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-sm sm:text-base"
      />
      <button
        type="submit"
        disabled={!message.trim() || isLoading}
        className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full font-medium transition-colors text-sm sm:text-base flex items-center gap-2"
      >
        {isLoading ? (
          <span className="animate-spin inline-block">⌛</span>
        ) : (
          <span>➤</span>
        )}
      </button>
    </form>
  );
};

export default ChatInput;
