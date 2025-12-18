import React from 'react';
import '../styles/TypingIndicator.css';

interface TypingIndicatorProps {
  users: string[];
}

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ users }) => {
  if (users.length === 0) return null;

  const text =
    users.length === 1
      ? `${users[0]} is typing...`
      : `${users.join(', ')} are typing...`;

  return (
    <div className="typing-indicator">
      <span>{text}</span>
      <span className="dots">
        <span>.</span>
        <span>.</span>
        <span>.</span>
      </span>
    </div>
  );
};

export default TypingIndicator;
