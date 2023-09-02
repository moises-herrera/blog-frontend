import { Navigate, Route, Routes } from 'react-router-dom';
import { routesData } from '.';

export const AppRouter = () => {
  return (
    <Routes>
      {routesData.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
