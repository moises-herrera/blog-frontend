import { Routes, Route, Navigate } from "react-router-dom";
import { authRoutesData } from ".";

export const AuthRoutes = () => {
  return (
    <Routes>
      {authRoutesData.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}

      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
};
