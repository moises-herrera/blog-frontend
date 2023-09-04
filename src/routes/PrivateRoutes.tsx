import { Routes, Route, Navigate } from "react-router-dom";
import { routesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
} from "src/shared/components";

//Gabriel
import { useDisclosure } from "@chakra-ui/react";
import { CommentsModal } from "src/shared/components/CommentsModal";
// import { RightSidebarNoLogin } from "src/shared/components/RightSidebarNoLogin";
// import { RecoveryPassword } from "src/shared/components/RecoveryPassword";
// import { LogIn } from "src/shared/components/LogIn";
// import { CreateAccount } from "src/shared/components/CreateAccount";

export const PrivateRoutes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main className="flex">
      <LeftSidebar />
      <MainContainer>
        <Routes>
          {routesData.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </MainContainer>
      <RightSidebar onOpen={onOpen} />
      <CommentsModal isOpen={isOpen} onClose={onClose} title="Seguir" />
      {/* <RightSidebarNoLogin onOpen={onOpen} /> */}
      {/* <LogIn isOpen={isOpen} onClose={onClose} /> */}
      {/* <CreateAccount isOpen={isOpen} onClose={onClose} /> */}
      {/* <RecoveryPassword isOpen={isOpen} onClose={onClose} /> */}
    </main>
  );
};
