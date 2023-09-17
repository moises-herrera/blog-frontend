/**
 * Message data.
 */
export interface Message {
  /** Message id. */
  _id: string;

  /** Message information. */
  content: {
    /** Content text. */
    text: string;
  };

  /** Sender id. */
  sender: string;

  /** Conversation id. */
  conversation: string;

  /** When the message was created. */
  createdAt: Date;

  /** When the message was delivered. */
  deliveredAt: Date;

  /** When the message was read. */
  readAt: Date;
}
