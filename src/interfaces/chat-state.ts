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

  /** If is creating chat. */
  isCreatingChat: boolean;

  /** Messages of the chat selected. */
  messages: Message[];

  /** If messages are loading. */
  isLoadingMessages: boolean;

  /** If is sending message. */
  isSendingMessage: boolean;

  /** Total messages of the chat selected. */
  totalMessages: number;

  /** If is chat modal open. */
  isChatModalOpen: boolean;
}
