import React from 'react';

interface ChatStatsProps {
  totalMessages: number;
  totalUsers: number;
  activeUsers: number;
}

export const ChatStats: React.FC<ChatStatsProps> = ({
  totalMessages,
  totalUsers,
  activeUsers,
}) => {
  return (
    <div className="chat-stats">
      <div className="stat-item">
        <span className="stat-label">Messages</span>
        <span className="stat-value">{totalMessages}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Users</span>
        <span className="stat-value">{totalUsers}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Active</span>
        <span className="stat-value">{activeUsers}</span>
      </div>
    </div>
  );
};

export default ChatStats;
