import { Routes, Route, Navigate } from "react-router-dom";
import { routesData } from ".";
import {
  LeftSidebar,
  MainContainer,
  RightSidebar,
} from "src/shared/components";

export const PrivateRoutes = () => {
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
      <RightSidebar />
    </main>
  );
};
