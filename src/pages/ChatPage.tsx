import React from "react";
import useSession from "../hooks/useSession";

const ChatPage: React.FC = () => {
  const { displayName, roomId, connectionStatus } = useSession();

  return (
    <div className="chat-page-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <div className="user-info">
          <span className="user-name">{displayName}</span>
          <span className="room-name">#{roomId}</span>
          <span className={`connection-status status-${connectionStatus}`}>
            {connectionStatus}
          </span>
        </div>
      </div>

      <div className="chat-content">
        {/* Chat messages will go here */}
        <p>Chat content</p>
      </div>

      <div className="chat-input">
        {/* Input field will go here */}
        <p>Input field</p>
      </div>
    </div>
  );
};

export default ChatPage;
