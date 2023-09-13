import {
  CloseButton,
  Modal,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { FollowersList } from ".";
import { useTypedSelector } from "src/store";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { closeFollowersModal } from "src/store/ui";

export const FollowersModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isFollowersModalOpen } = useTypedSelector(({ ui }) => ui);

  const onCloseModal = () => {
    dispatch(closeFollowersModal());
  };

  return (
    <Modal isOpen={isFollowersModalOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="primary.500" padding="16px">
        <div className="absolute text-white right-3">
          <CloseButton onClick={onCloseModal} />
        </div>
        <FollowersList />
      </ModalContent>
    </Modal>
  );
};
