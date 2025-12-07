export function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });
}

export function formatMessageText(text: string): string {
  return text.trim();
}

export function truncateMessage(text: string, maxLength: number = 100): string {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}
