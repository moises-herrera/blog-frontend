import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import { ModalData } from "src/interfaces";
import { ChatMessages } from ".";

export const ChatModal = ({ onClose, isOpen }: ModalData) => {
  const isMobile = window.screen.width <= 767;

  return (
    <>
      {isMobile && (
        <Modal onClose={onClose} isOpen={isOpen} size="full">
          <ModalContent>
            <ModalBody background="secondary.100">
              <button onClick={onClose}>
                <i className="text-xl fa-solid fa-arrow-left"></i>
              </button>
              <ChatMessages />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
