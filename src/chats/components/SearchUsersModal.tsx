import {
  Modal,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { closeSearchUsersModal } from "src/store/ui";
import { SearchUsersList } from ".";

export const SearchUsersModal = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isSearchUsersModalOpen } = useTypedSelector(({ ui }) => ui);

  const onCloseModal = () => {
    dispatch(closeSearchUsersModal());
  };

  return (
    <Modal isOpen={isSearchUsersModalOpen} onClose={onCloseModal} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="primary.500" padding="16px">
        <div className="absolute text-white right-3">
          <CloseButton onClick={onCloseModal} />
        </div>
        <SearchUsersList />
      </ModalContent>
    </Modal>
  );
};
