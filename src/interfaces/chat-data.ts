import { Message, UserChat } from ".";

/**
 * Represents the information of a chat.
 */
export interface ChatData {
  /** Conversation id. */
  _id: string;

  /** Participants of the conversation. */
  participants: UserChat[];

  /** Last message of the conversation. */
  lastMessage: Message;
}
