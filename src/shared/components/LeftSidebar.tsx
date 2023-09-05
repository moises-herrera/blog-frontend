import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { LeftSidebarLinks, Sidebar } from ".";

import { useSelector } from "react-redux";

export const LeftSidebar = () => {
  const { isLeftSidebarOpen } = useSelector(({ ui }) => ui);

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

      <button className="absolute bottom-0 pb-5 space-x-2 text-lg text-white">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span>Cerrar sesión</span>
      </button>
    </Sidebar>
  );
};
