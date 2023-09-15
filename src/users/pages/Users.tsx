import { useCallback, useEffect } from "react";
import { Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { UsersList } from "src/users/components";
import "./Users.css";
import { useScrollPagination, useSearch } from "src/hooks";
import { getAllUsers } from "src/store/users";
import { PaginatedResponse, User, QueryParams } from "src/interfaces";

export const Users = () => {
  const { list, isLoading, total } = useTypedSelector(({ users }) => users);

  const searchUsers = useCallback(
    (filter: string) =>
      getAllUsers({
        username: filter,
        excludeCurrentUser: true,
        limit: 10,
        page: 1,
      }),
    []
  );

  const getUsers = useCallback(
    (page: number) =>
      getAllUsers({
        username: "",
        excludeCurrentUser: true,
        limit: 10,
        page,
      }),
    []
  );

  const { onSearch } = useSearch<
    PaginatedResponse<User>,
    QueryParams | undefined
  >({
    value: null,
    action: searchUsers,
  });

  useScrollPagination<PaginatedResponse<User>, QueryParams | undefined>({
    isLoading,
    currentRecords: list.length,
    total: total - 1,
    action: getUsers,
  });

  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  return (
    <section className="section-content px-4 lg:px-8 !pt-12">
      <div className="flex justify-start w-full mb-4 text-3xl font-semibold lg:justify-between">
        <h2>Usuarios</h2>
        <div className="flex flex-col items-center ml-6 lg:ml-0">
          <i className="fa-solid fa-users"></i>
          <p className="text-[20px] ">{total}</p>
        </div>
      </div>

      <SearchInput
        placeholder="Buscar usuarios"
        onSearch={onSearch}
        backgroundColor="white"
        textColor="black"
        iconClassName="text-gray-400"
      />

      {isLoading ? (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      ) : (
        <UsersList users={list} />
      )}
    </section>
  );
};
