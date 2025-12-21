export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
}

export function filterMessagesBySender(messages: Message[], sender: string): Message[] {
  return messages.filter((msg) => msg.sender === sender);
}

export function filterMessagesByDate(messages: Message[], date: Date): Message[] {
  return messages.filter(
    (msg) => msg.timestamp.toDateString() === date.toDateString()
  );
}

export function searchMessages(messages: Message[], query: string): Message[] {
  return messages.filter((msg) =>
    msg.content.toLowerCase().includes(query.toLowerCase())
  );
}
