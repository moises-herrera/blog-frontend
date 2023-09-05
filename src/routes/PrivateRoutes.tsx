import { Routes, Route, Navigate } from "react-router-dom";
import { routesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
  CommentsModal,
} from "src/shared/components";

//Gabriel
import { useDisclosure } from "@chakra-ui/react";

export const PrivateRoutes = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <main className="flex w-full h-full">
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
    </main>
  );
};
