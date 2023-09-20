import { useEffect } from "react";
import { Loading, SearchInput, ListContainer } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { UsersList } from "src/users/components";
import { useScrollPagination, useSearch } from "src/hooks";
import { getAllUsers } from "src/store/users";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";

export default function Users() {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoading, totalUsers, resultsCount } = useTypedSelector(
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
        username: debouncedSearchTerm || "",
        excludeCurrentUser: true,
        limit: 10,
        page,
      })
    );
  }, [dispatch, debouncedSearchTerm, page]);

  useEffect(() => {
    document.title = "Usuarios";

    return () => {
      document.documentElement.scrollTop = 0;
    };
  }, []);

  return (
    <section className="section-content px-4 lg:px-8 !pt-12">
      <div className="flex justify-start w-full mb-4 text-3xl font-semibold lg:justify-between">
        <h2>Usuarios</h2>
        <div className="flex flex-col items-center ml-6 lg:ml-0">
          <i className="fa-solid fa-users"></i>
          <p className="text-[20px]">{totalUsers}</p>
        </div>
      </div>

      <SearchInput
        placeholder="Buscar usuarios"
        onSearch={onSearch}
        backgroundColor="white"
        textColor="black"
        iconClassName="text-gray-400"
      />

      {!list.length && isLoading ? (
        <div className="loading-container">
          <Loading textClass="text-black" />
        </div>
      ) : (
        <ListContainer isLoading={isLoading}>
          <UsersList users={list} />
        </ListContainer>
      )}
    </section>
  );
}
