import { Routes, Route, Navigate } from "react-router-dom";
import { privateRoutesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
  FollowersModal,
  FollowingModal,
} from "src/shared/components";
import {
  PostFormModal,
  CommentsModalContainer,
  LikesModal,
} from "src/post/components";

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
      <FollowersModal />
      <FollowingModal />
      <LikesModal />
    </main>
  );
};
