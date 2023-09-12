import { LeftSidebarLinks, Sidebar } from ".";
import { useTypedSelector } from "src/store";
import { removeToken } from "src/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { onLogout } from "src/store/auth";
import { APP_NAME } from "src/constants";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";

export const LeftSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLeftSidebarOpen } = useTypedSelector(({ ui }) => ui);

  const onClickLogout = (): void => {
    removeToken();
    dispatch(onLogout(null));
    document.title = `${APP_NAME}`;
  };

  useEffect(() => {
    if (isLeftSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isLeftSidebarOpen]);

  return (
    <Sidebar
      cssClass={`lg:block lg:border-r lg:border-gray-500 ${
        isLeftSidebarOpen ? "block w-screen" : "hidden"
      }`}
    >
      <NavLink to="/">
        <div className="my-10 text-center">
          <h2 className="text-5xl font-bold text-accent-500">{APP_NAME}</h2>
        </div>
      </NavLink>

      <LeftSidebarLinks />

      <button
        onClick={onClickLogout}
        className="mt-2 space-x-2 text-lg text-white"
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Cerrar sesión</span>
      </button>
    </Sidebar>
  );
};
