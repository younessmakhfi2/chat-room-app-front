export interface Message {
  id: string;
  sender: string;
  senderName: string;
  content: string;
  timestamp: Date;
  edited?: boolean;
  deletedAt?: Date;
}

export interface User {
  id: string;
  name: string;
  status: 'online' | 'offline' | 'away';
  lastSeen: Date;
}

export interface ChatRoom {
  id: string;
  name: string;
  description: string;
  users: User[];
  messages: Message[];
  createdAt: Date;
}

export interface ChatMessage {
  type: 'message' | 'system' | 'notification';
  payload: Message | string;
}
