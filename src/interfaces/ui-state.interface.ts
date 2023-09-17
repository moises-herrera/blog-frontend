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

  /**Wheter the right sidebar is open  */
  isRigthSidebarOpen: boolean;
}
