import React from 'react';
import '../styles/ChatMessages.css';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  return (
    <div className="chat-messages">
      {messages.length === 0 ? (
        <div className="empty-state">No messages yet. Start the conversation!</div>
      ) : (
        messages.map((message) => (
          <div key={message.id} className="message-item">
            <div className="message-header">
              <span className="message-sender">{message.sender}</span>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="message-content">{message.content}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default ChatMessages;
