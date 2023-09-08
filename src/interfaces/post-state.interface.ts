import { Post, PostInfo } from ".";

/**
 * Represents the state of the post in the store.
 */
export interface PostState {
  /** Posts following list. */
  postFollowingList: PostInfo[];

  /** Loading state. */
  isLoadingFollowing: boolean;

  /** Posts suggested list. */
  postSuggestedList: PostInfo[];

  /** Loading state. */
  isLoadingSuggested: boolean;

  /** User's posts. */
  userPosts: PostInfo[];

  /** Loading state. */
  isLoadingUserPosts: boolean;

  /** Whether the new post form is visible. */
  isNewPostFormVisible: boolean;

  /** Whether the post form is loading. */
  isLoadingPostForm: boolean;

  /** Success message. */
  successMessage?: string | null;

  /** Error message. */
  errorMessage?: string | null;

  /** Edit post active. */
  editPost?: Post | null;
}
