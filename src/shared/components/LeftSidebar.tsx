import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LeftSidebarLinks, Sidebar } from ".";
import { useTypedSelector } from "src/store";
import { removeToken } from "src/helpers";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { onLogout } from "src/store/auth";

export const LeftSidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLeftSidebarOpen } = useTypedSelector(({ ui }) => ui);

  const onClickLogout = (): void => {
    removeToken();
    dispatch(onLogout(null));
  };

  return (
    <Sidebar
      cssClass={`lg:block ${isLeftSidebarOpen ? "block w-screen" : "hidden"}`}
    >
      <div className="my-10 text-center">
        <h2 className="text-5xl font-bold text-accent-500">Blog.</h2>
      </div>

      <InputGroup className="mb-5">
        <InputLeftElement pointerEvents="none">
          <i className="text-white fa-solid fa-magnifying-glass"></i>
        </InputLeftElement>
        <Input
          type="text"
          placeholder="Buscar tema de interes"
          textColor={"#ffffff"}
        />
      </InputGroup>

      <LeftSidebarLinks />

      <button
        onClick={onClickLogout}
        className="absolute bottom-0 pb-5 space-x-2 text-lg text-white"
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Cerrar sesión</span>
      </button>
    </Sidebar>
  );
};
