import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getAllUsers } from "src/store/users";
import { UsersList } from "src/users/components";
import "./Users.css";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useDebounce } from "use-debounce";

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

  const onSearchUsers = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
  };

  return (
    <section className="section-content p-8 !py-12">
      <h2 className="text-3xl font-semibold">Usuarios</h2>

      <InputGroup className="mt-4">
        <InputLeftElement pointerEvents="none">
          <i className="text-gray-400 fa-solid fa-magnifying-glass"></i>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar usuarios"
          backgroundColor="white"
          value={searchTerm}
          onChange={onSearchUsers}
        />
      </InputGroup>

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
