import { createSlice } from "@reduxjs/toolkit";
import { ChatState } from "src/interfaces";
import { getChatsList, getMessages } from ".";

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

    builder.addCase(getMessages.pending, (state) => {
      state.isLoadingMessages = true;
    });
    builder.addCase(
      getMessages.fulfilled,
      (state, { payload: { data, page, resultsCount } }) => {
        state.isLoadingMessages = false;
        state.messages = page > 1 ? [...state.messages, ...data] : data;
        state.totalChats = resultsCount;
      }
    );
    builder.addCase(getMessages.rejected, (state) => {
      state.isLoadingMessages = false;
    });
  },
});

export const { setChatSelected, clearChatSelected } = chatSlice.actions;
