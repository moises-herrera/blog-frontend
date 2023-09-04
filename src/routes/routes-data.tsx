import { Feed } from 'src/feed/pages';
import { RouteData } from 'src/interfaces';
import { Profile } from 'src/profile/pages';

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
    element: <Profile />,
  },
  {
    path: '/settings',
    element: <>Configuracion</>,
  },
];
