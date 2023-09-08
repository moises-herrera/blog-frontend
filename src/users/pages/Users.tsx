import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getUsers } from "src/store/users";
import { UsersList } from "src/users/components";

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useTypedSelector(({ users }) => users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <section className="section-content p-8 !py-12">
      <h2 className="text-3xl font-semibold">Usuarios</h2>

      <UsersList users={list} />
    </section>
  );
};
