import { Message } from ".";

/**
 * Send message data.
 */
export interface SendMessage {
  /** Conversation id. */
  id: string;

  /** Message data. */
  message: Partial<Message>;
}
