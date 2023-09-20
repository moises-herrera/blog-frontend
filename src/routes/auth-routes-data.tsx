import { RouteData } from "src/interfaces";
import { LazyLoadRoute } from ".";

/**
 * Public routes data.
 */
export const authRoutesData: RouteData[] = [
  {
    path: "/login",
    element: LazyLoadRoute(() => import("../auth/pages/Login.tsx")),
  },
  {
    path: "/register",
    element: LazyLoadRoute(() => import("../auth/pages/Register.tsx")),
  },
  {
    path: "/forgot-password",
    element: LazyLoadRoute(() => import("../auth/pages/ForgotPassword.tsx")),
  },
  {
    path: "/reset-password",
    element: LazyLoadRoute(() => import("../auth/pages/ResetPassword.tsx")),
  },
  {
    path: "/confirm-email",
    element: LazyLoadRoute(() => import("../auth/pages/ConfirmEmail.tsx")),
  },
];
