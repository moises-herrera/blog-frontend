import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import { useTypedSelector } from "src/store";
import { ModalData } from "src/interfaces";
import { HeaderChat } from ".";

export const ChatModal = ({ onClose, isOpen }: ModalData) => {
  const { chatSelected } = useTypedSelector(({ chats }) => chats);
  const isMobile = window.screen.width <= 767;
  const participant = chatSelected?.participants[0];

  return (
    <>
      {isMobile && participant && (
        <Modal onClose={onClose} isOpen={isOpen} size={"full"}>
          <ModalContent>
            <ModalBody background="secondary.100">
              <button onClick={onClose}>
                <i className="text-xl fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <HeaderChat
                  avatar={participant?.avatar}
                  fullName={participant?.fullName}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
