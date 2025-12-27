export interface MessageAction {
  type: 'edit' | 'delete' | 'pin' | 'react';
  messageId: string;
  userId: string;
}

export interface EditMessagePayload {
  messageId: string;
  newContent: string;
  editedAt: Date;
}

export interface DeleteMessagePayload {
  messageId: string;
  deletedAt: Date;
}

export const createMessageAction = (
  type: MessageAction['type'],
  messageId: string,
  userId: string
): MessageAction => ({
  type,
  messageId,
  userId,
});
