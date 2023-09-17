import { createSlice } from "@reduxjs/toolkit";

import { ChatState } from "src/interfaces/chat-state";

const initialState: ChatState = {
  list: [],
  isLoadingList: false,
  chatSelected: null,
  messages: [],
  isLoadingMessages: false,
};

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChatSelected: (state, { payload }) => {
      state.chatSelected = payload;
    },
    clearChatSelected: (state) => {
      state.chatSelected = null;
    },
  },
});

export const { setChatSelected, clearChatSelected } = chatSlice.actions;
