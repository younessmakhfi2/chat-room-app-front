export function isValidUsername(username: string): boolean {
  return username.length >= 2 && username.length <= 20;
}

export function isValidMessage(message: string): boolean {
  return message.trim().length > 0 && message.length <= 500;
}

export function sanitizeInput(input: string): string {
  return input.trim().replace(/[<>]/g, '');
}
