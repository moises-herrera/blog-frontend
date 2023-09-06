/**
 * Email state in the store.
 */
export interface EmailState {
  /** Notification message. */
  notification: string;

  /** Loading state. */
  isLoading: boolean;

  /** Error message. */
  error: string;
}
