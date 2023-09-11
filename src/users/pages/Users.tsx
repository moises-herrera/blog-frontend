import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loading, SearchInput } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getAllUsers } from "src/store/users";
import { UsersList } from "src/users/components";
import { useDebounce } from "use-debounce";
import "./Users.css";

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoading } = useTypedSelector(({ users }) => users);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 600);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers(debouncedSearchTerm));
  }, [dispatch, debouncedSearchTerm]);

  useEffect(() => {
    document.title = "Usuarios";
  }, []);

  const onSearchUsers = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  return (
    <section className="section-content p-8 !py-12">
      <h2 className="text-3xl font-semibold mb-4">Usuarios</h2>

      <SearchInput
        placeholder="Buscar usuarios"
        onSearch={onSearchUsers}
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
