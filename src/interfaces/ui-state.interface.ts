/**
 * Represents the state of the UI.
 */
export interface UiState {
  /** Whether the left sidebar is open. */
  isLeftSidebarOpen: boolean;

  /** Whether the followers modal is open. */
  isFollowersModalOpen: boolean;

  /** Whether the following modal is open. */
  isFollowingModalOpen: boolean;

  /** Whether the right sidebar is open  */
  isRightSidebarOpen: boolean;

  /** Whether the post form modal is open. */
  isLikeModalOpen: boolean;
}
