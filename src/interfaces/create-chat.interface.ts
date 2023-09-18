import { Message } from ".";

/**
 * Represents the information to create a chat.
 */
export interface CreateChat {
  /** Participants of the conversation. */
  participants: string[];

  /** Message of the conversation. */
  message?: Partial<Message>;
}
