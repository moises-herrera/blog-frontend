import { User } from ".";

/**
 * Represents the users data in the store.
 */
export interface UsersState {
  /** Users list. */
  list: User[];

  /** Loading state. */
  isLoading: boolean;

  /** Error message. */
  error?: string | null;
}
