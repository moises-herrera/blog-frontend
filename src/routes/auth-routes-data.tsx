import {
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  ConfirmEmail,
} from "src/auth/pages";
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
  {
    path: "/confirm-email",
    element: <ConfirmEmail />,
  },
];
