import { Post } from ".";

/**
 * Represents the state of the post in the store.
 */
export interface PostState {
  /** Posts list. */
  posts: Post[];

  /** Loading state. */
  isLoading: boolean;

  /** Whether the new post form is visible. */
  isNewPostFormVisible: boolean;

  /** Whether the post form is loading. */
  isLoadingPostForm: boolean;

  /** Success message. */
  successMessage?: string | null;

  /** Error message. */
  errorMessage?: string | null;
}
