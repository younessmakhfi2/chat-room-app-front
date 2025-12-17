import React from 'react';

interface User {
  id: string;
  name: string;
  status: 'online' | 'offline';
}

interface UserListProps {
  users: User[];
  currentUserId: string;
}

export const UserList: React.FC<UserListProps> = ({ users, currentUserId }) => {
  return (
    <div className="user-list">
      <h3>Online Users ({users.filter((u) => u.status === 'online').length})</h3>
      <ul>
        {users.map((user) => (
          <li key={user.id} className={`user-item ${user.status}`}>
            <span className={`status-indicator ${user.status}`}></span>
            <span className="user-name">
              {user.name}
              {user.id === currentUserId && ' (You)'}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
