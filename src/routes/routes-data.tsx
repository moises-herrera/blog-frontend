import { Feed } from 'src/feed/pages';
import { RouteData } from 'src/interfaces';

/**
 * Public routes data.
 */
export const publicRoutesData: RouteData[] = [
  {
    path: '/login',
    element: <>Login</>,
  },
  {
    path: '/register',
    element: <>Register</>,
  },
];

/**
 * Private routes data.
 */
export const routesData: RouteData[] = [
  {
    path: '/',
    element: <Feed />,
  },
  {
    path: '/profile',
    element: <>Perfil</>,
  },
  {
    path: '/settings',
    element: <>Configuracion</>,
  },
];
