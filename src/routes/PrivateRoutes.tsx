import { Routes, Route, Navigate } from 'react-router-dom';
import { routesData } from '.';
import { LeftSidebar, MainContainer } from 'src/shared/components';

export const PrivateRoutes = () => {
  return (
    <main className="flex h-full w-full">
      <LeftSidebar />
      <MainContainer>
        <Routes>
          {routesData.map(({ path, element }) => (
            <Route key={path} path={path} element={element} />
          ))}

          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </MainContainer>
    </main>
  );
};
