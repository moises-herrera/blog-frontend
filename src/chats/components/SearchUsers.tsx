import {
  Modal,
  ModalOverlay,
  ModalContent,
  CloseButton,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useScrollPagination, useSearch } from "src/hooks";
import { SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getAllUsers } from "src/store/users";
import { ModalData } from "src/interfaces";
import { UserItem } from ".";

export const SearchUsers = ({ isOpen, onClose }: ModalData) => {
  const onCloseModal = () => {
    onClose();
  };
  const dispatch = useDispatch<AppDispatch>();
  const { list, resultsCount, isLoading } = useTypedSelector(
    ({ users }) => users
  );
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const { page } = useScrollPagination({
    isLoading,
    currentRecords: list.length,
    total: resultsCount,
  });

  useEffect(() => {
    dispatch(
      getAllUsers({
        name: debouncedSearchTerm || "",
        excludeCurrentUser: true,
        limit: 10,
        page,
      })
    );
  }, [dispatch, debouncedSearchTerm, page]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent backgroundColor="primary.500" padding="16px">
        <div className="absolute text-white right-3">
          <CloseButton onClick={onClose} />
        </div>
        <div className="users-container">
          <p className="users-list-title">Usuarios</p>
          <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
        </div>
        <div className="users-list h-[310px] overflow-auto scrollable-div">
          {list.map((user) => (
            <UserItem
              key={user.username}
              _id={user._id}
              fullName={`${user.firstName} ${user.lastName}`}
              avatar={user?.avatar || ""}
              onClose={onCloseModal}
            />
          ))}
        </div>
      </ModalContent>
    </Modal>
  );
};
