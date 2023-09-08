import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Loading } from "src/shared/components";
import { useTypedSelector } from "src/store";
import { AppDispatch } from "src/store/types";
import { getUsers } from "src/store/users";
import { UsersList } from "src/users/components";
import "./Users.css";

export const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, isLoading } = useTypedSelector(({ users }) => users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <section className="section-content p-8 !py-12">
      <h2 className="text-3xl font-semibold">Usuarios</h2>

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
