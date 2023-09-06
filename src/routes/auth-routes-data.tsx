import { Login, Register, ForgotPassword } from "src/auth/pages";
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
];
