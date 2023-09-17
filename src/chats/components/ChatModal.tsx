import { Modal, ModalContent, ModalBody } from "@chakra-ui/react";
import { useTypedSelector } from "src/store";
import { HeaderChat } from "./HeaderChat";

interface ControlModal {
  onClose: () => void;
  isOpen: boolean;
}

export const ChatModal = ({ onClose, isOpen }: ControlModal) => {
  const { chatSelected } = useTypedSelector(({ chats }) => chats);
  const width = window.screen.width;
  return (
    <>
      {width <= 767 ? (
        <Modal onClose={onClose} isOpen={isOpen} size={"full"}>
          <ModalContent>
            <ModalBody background={"#D3D3D3"}>
              <button onClick={onClose}>
                <i className="text-xl fa-solid fa-arrow-left"></i>
              </button>
              <div>
                <HeaderChat
                  avatar={chatSelected?.avatar}
                  fullname={chatSelected?.fullname}
                  id={chatSelected?.id}
                />
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
      ) : null}
    </>
  );
};
