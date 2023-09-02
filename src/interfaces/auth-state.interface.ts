import { AuthStatus } from '.';

/**
 * Auth state for Redux.
 */
export interface AuthState {
  /** User data. */
  user: unknown;

  /** Auth status. */
  status: AuthStatus;

  /** Error message. */
  errorMessage: string | null;
}
