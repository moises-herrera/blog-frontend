import { RouteData } from "src/interfaces";
import { LazyLoadRoute } from ".";

/**
 * Private routes data.
 */
export const privateRoutesData: RouteData[] = [
  {
    path: "/",
    element: LazyLoadRoute(() => import("../feed/pages/Feed.tsx")),
  },
  {
    path: "/search",
    element: LazyLoadRoute(() => import("../search/pages/Search.tsx")),
  },
  {
    path: "/profile/:username",
    element: LazyLoadRoute(() => import("../profile/pages/Profile.tsx")),
  },
  {
    path: "/users",
    element: LazyLoadRoute(() => import("../users/pages/Users.tsx")),
  },
  {
    path: "/chats",
    element: LazyLoadRoute(() => import("../chats/pages/Chats.tsx")),
  },
  {
    path: "/settings",
    element: LazyLoadRoute(
      () => import("../settings/components/SettingForm.tsx")
    ),
  },
];
