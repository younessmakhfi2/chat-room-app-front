export type MessageType = "CHAT" | "SYSTEM" | "JOIN" | "LEAVE";

export interface ChatMessage {
  id?: string;
  userId: string;
  displayName: string;
  roomId: string;
  type: MessageType;
  content: string;
  timestamp: number;
  avatar?: string;
}

export interface WebSocketMessage {
  type: MessageType;
  payload: ChatMessage;
}

export interface WebSocketErrorEvent {
  code: number;
  reason: string;
}
