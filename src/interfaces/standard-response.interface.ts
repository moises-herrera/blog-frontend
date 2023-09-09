/**
 * Standard response interface.
 */
export interface StandardResponse<T = void> {
  /** Notification message. */
  message: string;

  /** Data. */
  data?: T;
}
