import { RouteData } from "src/interfaces";
import { LazyLoadRoute } from ".";

/**
 * Public routes data.
 */
export const authRoutesData: RouteData[] = [
  {
    path: "/login",
    element: LazyLoadRoute("../auth/pages/Login.tsx"),
  },
  {
    path: "/register",
    element: LazyLoadRoute("../auth/pages/Register.tsx"),
  },
  {
    path: "/forgot-password",
    element: LazyLoadRoute("../auth/pages/ForgotPassword.tsx"),
  },
  {
    path: "/reset-password",
    element: LazyLoadRoute("../auth/pages/ResetPassword.tsx"),
  },
  {
    path: "/confirm-email",
    element: LazyLoadRoute("../auth/pages/ConfirmEmail.tsx"),
  },
];
