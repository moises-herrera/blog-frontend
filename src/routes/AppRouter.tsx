import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes, PrivateRoutes } from ".";
import { useTypedSelector } from "src/store";

export const AppRouter = () => {
  const { status } = useTypedSelector(({ auth }) => auth);

  return (
    <Routes>
      {status === "authenticated" ? (
        <Route path="/*" element={<PrivateRoutes />} />
      ) : (
        <Route path="/auth/*" element={<AuthRoutes />} />
      )}

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
