import { createSlice } from "@reduxjs/toolkit";
import { ChatData, ChatState } from "src/interfaces";
import { createChat, getChatsList, getMessages, sendMessage } from ".";

const initialState: ChatState = {
  list: [],
  isLoadingList: false,
  totalChats: 0,
  chatSelected: null,
  messages: [],
  isLoadingMessages: false,
  totalMessages: 0,
  isSendingMessage: false,
  isCreatingChat: false,
  isChatModalOpen: false,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatSelected: (state, { payload }) => {
      const existingChat = state.list.find(
        ({ participants }) =>
          participants[0]._id === payload?.participants[0]._id
      );

      if (existingChat) {
        state.chatSelected = existingChat;
      } else {
        state.chatSelected = payload;
      }

      if (window.screen.width <= 767) {
        state.isChatModalOpen = true;
      }
    },
    clearChatSelected: (state) => {
      state.chatSelected = null;
    },
    addNewMessage: (state, { payload }) => {
      if (state.chatSelected?._id === payload.conversation) {
        state.messages = [...state.messages, payload];
      }
    },
    updateLastMessage: (state, { payload }) => {
      if (payload) {
        state.list = state.list.map((chat) => {
          if (chat._id === payload.conversation) {
            chat.lastMessage = payload;
          }

          return chat;
        });

        state.list.sort((a, b) => {
          if (!a.lastMessage) return -1;
          if (!b.lastMessage) return 1;

          return (
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
          );
        });
      }
    },
    clearMessages: (state) => {
      state.messages = [];
    },
    openChatModal: (state) => {
      state.isChatModalOpen = true;
    },
    closeChatModal: (state) => {
      state.isChatModalOpen = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getChatsList.pending, (state) => {
      state.isLoadingList = true;
    });
    builder.addCase(
      getChatsList.fulfilled,
      (state, { payload: { data, page, resultsCount } }) => {
        state.isLoadingList = false;
        state.list = page > 1 ? [...state.list, ...data] : data;
        state.totalChats = resultsCount;
      }
    );
    builder.addCase(getChatsList.rejected, (state) => {
      state.isLoadingList = false;
    });

    builder.addCase(getMessages.pending, (state) => {
      state.isLoadingMessages = true;
    });
    builder.addCase(
      getMessages.fulfilled,
      (state, { payload: { data, page, resultsCount } }) => {
        state.isLoadingMessages = false;
        state.messages = page > 1 ? [...data, ...state.messages] : data;
        state.totalMessages = resultsCount;
      }
    );
    builder.addCase(getMessages.rejected, (state) => {
      state.isLoadingMessages = false;
    });

    builder.addCase(sendMessage.pending, (state) => {
      state.isSendingMessage = true;
    });
    builder.addCase(sendMessage.fulfilled, (state, { payload: { data } }) => {
      state.isSendingMessage = false;
      if (data) {
        state.list = state.list.map((chat) => {
          if (chat._id === data.conversation) {
            chat.lastMessage = data;
          }

          return chat;
        });
      }
    });
    builder.addCase(sendMessage.rejected, (state) => {
      state.isSendingMessage = false;
    });

    builder.addCase(createChat.pending, (state) => {
      state.isCreatingChat = true;
    });
    builder.addCase(createChat.fulfilled, (state, { payload }) => {
      state.isCreatingChat = false;
      const chat = payload.data as ChatData;
      state.chatSelected = chat;
      state.list = state.list.length > 1 ? [chat, ...state.list] : [chat];
    });
    builder.addCase(createChat.rejected, (state) => {
      state.isCreatingChat = false;
    });
  },
});

export const {
  setChatSelected,
  clearChatSelected,
  addNewMessage,
  updateLastMessage,
  clearMessages,
  openChatModal,
  closeChatModal,
} = chatSlice.actions;
