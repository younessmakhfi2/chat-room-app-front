export class ChatRoomError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'ChatRoomError';
  }
}

export const handleError = (error: unknown): { message: string; code: string } => {
  if (error instanceof ChatRoomError) {
    return { message: error.message, code: error.code };
  }

  if (error instanceof Error) {
    return { message: error.message, code: 'UNKNOWN_ERROR' };
  }

  return { message: 'An unexpected error occurred', code: 'UNKNOWN_ERROR' };
};
