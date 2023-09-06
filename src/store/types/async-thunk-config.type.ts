import { ErrorResponse } from "src/interfaces";
import { RootState } from "src/store";
import { AppDispatch } from ".";

/**
 * Async thunk config.
 */
export type AsyncThunkConfig = {
  /** Store state. */
  state: RootState;

  /** Dispatch function. */
  dispatch: AppDispatch;

  /** Reject value function. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rejectWithValue: any;

  /** Reject value. */
  rejectValue: ErrorResponse;
};
