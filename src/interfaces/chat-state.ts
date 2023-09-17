import { ChatItem, Message } from ".";

export interface ChatState {
  list: ChatItem[];
  isLoadingList: boolean;
  chatSelected: ChatItem | null;
  messages: Message[];
  isLoadingMessages: boolean;
}
