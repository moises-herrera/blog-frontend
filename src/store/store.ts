import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "src/store/auth";
import { uiSlice } from "src/store/ui";
import { postSlice } from "src/store/post";
import { emailSlice } from "src/store/email";

/**
 * Redux store.
 */
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    post: postSlice.reducer,
    email: emailSlice.reducer,
  },
});
