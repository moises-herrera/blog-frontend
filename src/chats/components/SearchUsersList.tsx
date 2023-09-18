import { SearchInput } from "src/shared/components";
import { UserItem } from ".";
import { useDispatch } from "react-redux";
import { useRef, useEffect } from "react";
import { useSearch, useScrollPagination } from "src/hooks";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getAllUsers } from "src/store/users";
import { closeSearchUsersModal } from "src/store/ui";

export const SearchUsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, resultsCount, isLoading } = useTypedSelector(
    ({ users }) => users
  );
  const { debouncedSearchTerm, onSearch } = useSearch({
    value: "",
  });
  const usersListRef = useRef<HTMLDivElement>(null);
  const { page } = useScrollPagination({
    isLoading,
    currentRecords: list.length,
    total: resultsCount,
    elementRef: usersListRef,
  });

  const onCloseModal = () => {
    dispatch(closeSearchUsersModal());
  };

  useEffect(() => {
    dispatch(
      getAllUsers({
        name: debouncedSearchTerm || "",
        excludeCurrentUser: true,
        limit: 6,
        page,
      })
    );
  }, [dispatch, debouncedSearchTerm, page]);

  return (
    <>
      <div className="users-container">
        <p className="users-list-title">Usuarios</p>
        <SearchInput placeholder="Buscar usuarios" onSearch={onSearch} />
      </div>
      <div
        className="users-list h-[310px] overflow-auto scrollable-div"
        ref={usersListRef}
      >
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
    </>
  );
};
