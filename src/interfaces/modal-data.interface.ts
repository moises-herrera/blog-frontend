/**
 * Represents the data passed to a modal.
 */
export interface ModalData {
  /** Whether the modal is open. */
  isOpen: boolean;

  /** Function to close the modal. */
  onClose: () => void;
}
