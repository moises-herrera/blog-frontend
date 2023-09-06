import { Dispatch } from "@reduxjs/toolkit";
import { ErrorResponse } from "src/interfaces";
import { RootState } from "src/store";

/**
 * Async thunk config.
 */
export type AsyncThunkConfig = {
  /** Store state. */
  state: RootState;

  /** Dispatch function. */
  dispatch: Dispatch;

  /** Reject value function. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rejectWithValue: any;

  /** Reject value. */
  rejectValue: ErrorResponse;
};
