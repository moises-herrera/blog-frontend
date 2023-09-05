import { RouteData } from "src/interfaces";
import { MainContainer } from "src/shared/components/MainContainer";
import { Feed } from "src/feed/pages";
import { Profile } from "src/profile/pages";

/**
 * Public routes data.
 */
export const publicRoutesData: RouteData[] = [
  {
    path: "/login",
    element: <>Login</>,
  },
  { path: "/register", element: <>Register</> },
];

/**
 * Private routes data.
 */
export const routesData: RouteData[] = [
  {
    path: "/",
    element: <MainContainer />,
  },
  {
    path: "/profile",
    element: <>Perfil</>,
    path: "/",
    element: <Feed />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/settings",
    element: <>Configuracion</>,
  },
];
