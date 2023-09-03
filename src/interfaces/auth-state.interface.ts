import { AuthStatus, User } from '.';

/**
 * Auth state for Redux.
 */
export interface AuthState {
  /** User data. */
  user: User;

  /** Auth status. */
  status: AuthStatus;

  /** Error message. */
  errorMessage: string | null;
}
