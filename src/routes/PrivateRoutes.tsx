import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
  CommentsModal,
} from "src/shared/components";
import { useDisclosure } from "@chakra-ui/react";
import { PostFormModal } from "src/post/components";

export const PrivateRoutes = () => {
  const { isOpen, onClose } = useDisclosure();

  return (
    <main className="flex w-full h-full">
      <LeftSidebar />
      <MainContainer>
        <Routes>
          {privateRoutesData.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </MainContainer>
      <RightSidebar />
      <PostFormModal />
      <CommentsModal isOpen={isOpen} onClose={onClose} title="Seguir" />
    </main>
  );
};
