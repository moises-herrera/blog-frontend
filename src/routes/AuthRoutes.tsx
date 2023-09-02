import { Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutesData } from '.';

export const AuthRoutes = () => {
  return (
    <Routes>
      {publicRoutesData.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
