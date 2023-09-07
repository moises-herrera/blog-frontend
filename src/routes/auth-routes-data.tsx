import { Login, Register, ForgotPassword } from "src/auth/pages";
import { ResetPassword } from "src/auth/pages/ResetPassword";
import { RouteData } from "src/interfaces";

/**
 * Public routes data.
 */
export const authRoutesData: RouteData[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
];
