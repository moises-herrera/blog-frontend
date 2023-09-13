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

  /** Followers list. */
  followers: User[];

  /** Whether the followers are loading. */
  followersLoading: boolean;

  /** Following list. */
  following: User[];

  /** Whether the following are loading. */
  followingLoading: boolean;

  /** User profile. */
  userProfile: User | null;

  /** Whether the user profile is loading. */
  userProfileLoading: boolean;
}
