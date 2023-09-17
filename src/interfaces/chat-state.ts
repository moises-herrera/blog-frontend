import { ChatData, Message } from ".";

/**
 * Chat state in the store.
 */
export interface ChatState {
  /** Chats list. */
  list: ChatData[];

  /** If chats list is loading. */
  isLoadingList: boolean;

  /** Total chats. */
  totalChats: number;

  /** Chat selected. */
  chatSelected: ChatData | null;

  /** Messages of the chat selected. */
  messages: Message[];

  /** If messages are loading. */
  isLoadingMessages: boolean;
}
