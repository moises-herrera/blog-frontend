import {
  Modal,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { closeLikesModal } from "src/store/ui";
import { LikesList } from ".";
import { clearPostInfoActive } from "src/store/post";

export const LikesModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLikeModalOpen } = useTypedSelector(({ ui }) => ui);

  const onCloseModal = () => {
    dispatch(closeLikesModal());
    dispatch(clearPostInfoActive());
  };

  return (
    <Modal isOpen={isLikeModalOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="primary.500" padding="16px">
        <div className="absolute text-white right-3">
          <CloseButton onClick={onCloseModal} />
        </div>
        <LikesList />
      </ModalContent>
    </Modal>
  );
};
