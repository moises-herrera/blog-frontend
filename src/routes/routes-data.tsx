import { Login } from "src/auth/pages/Login";
import { Register } from "src/auth/pages/Register";
import { Feed } from "src/feed/pages";
import { RouteData } from "src/interfaces";
import { Profile } from "src/profile/pages";
import { SettingForm } from "src/shared/components";

/**
 * Public routes data.
 */
export const publicRoutesData: RouteData[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

/**
 * Private routes data.
 */
export const privateRoutesData: RouteData[] = [
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <SettingForm />,
  },
];
