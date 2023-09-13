import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes, PrivateRoutes } from ".";
import { useTypedSelector } from "src/store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "src/store/types";
import { validateAccessToken } from "src/store/auth";
import { AuthLoading } from "src/auth/components";

export const AppRouter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useTypedSelector(({ auth }) => auth);

  useEffect(() => {
    dispatch(validateAccessToken());
  }, []);

  if (status === "checking") return <AuthLoading />;

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
