import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
} from "src/shared/components";
import { PostFormModal, CommentsModalContainer } from "src/post/components";

export const PrivateRoutes = () => {
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

      <CommentsModalContainer />
    </main>
  );
};
