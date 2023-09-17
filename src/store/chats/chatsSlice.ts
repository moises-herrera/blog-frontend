import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "src/interfaces";
import { getChatsList } from ".";

const initialState: ChatState = {
  list: [],
  isLoadingList: false,
  totalChats: 0,
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
  },
});

export const { setChatSelected, clearChatSelected } = chatSlice.actions;
