import { AuthStatus, User } from ".";

/**
 * Auth state for Redux.
 */
export interface AuthState {
  /** User data. */
  user: User | null;

  /** Auth status. */
  status: AuthStatus;

  /** Success message. */
  successMessage?: string | null;

  /** Error message. */
  errorMessage?: string | null;

  /** Loading status. */
  isLoading: boolean;

  /** Response status. */
  responseStatus?: "success" | "error" | null;
}
