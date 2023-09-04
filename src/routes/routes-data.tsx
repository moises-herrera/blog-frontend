import { RouteData } from "src/interfaces";
import { MainContainer } from "src/shared/components/MainContainer";

/**
 * Public routes data.
 */
export const publicRoutesData: RouteData[] = [
  {
    path: "/login",
    element: <>Login</>,
  },
  {
    path: "/register",
    element: <>Register</>,
  },
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
  },
  {
    path: "/settings",
    element: <>Configuracion</>,
  },
];
