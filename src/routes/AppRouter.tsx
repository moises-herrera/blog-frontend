import { Navigate, Route, Routes } from "react-router-dom";
import { LazyLoadRoute } from ".";
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
        <Route
          path="/*"
          element={LazyLoadRoute(() => import("../routes/PrivateRoutes.tsx"))}
        />
      ) : (
        <Route
          path="/auth/*"
          element={LazyLoadRoute(() => import("../routes/AuthRoutes.tsx"))}
        />
      )}

      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
