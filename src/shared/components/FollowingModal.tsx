import {
  Modal,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { closeFollowingModal } from "src/store/ui";
import { FollowingList } from ".";

export const FollowingModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isFollowingModalOpen } = useTypedSelector(({ ui }) => ui);

  const onCloseModal = () => {
    dispatch(closeFollowingModal());
  };

  return (
    <Modal isOpen={isFollowingModalOpen} onClose={onCloseModal}>
      <ModalOverlay />
      <ModalContent backgroundColor="primary.500" padding="16px">
        <div className="absolute text-white right-3">
          <CloseButton onClick={onCloseModal} />
        </div>
        <FollowingList />
      </ModalContent>
    </Modal>
  );
};
