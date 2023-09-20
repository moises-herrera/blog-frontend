import { RouteData } from "src/interfaces";
import { LazyLoadRoute } from ".";

/**
 * Private routes data.
 */
export const privateRoutesData: RouteData[] = [
  {
    path: "/",
    element: LazyLoadRoute("../feed/pages/Feed.tsx"),
  },
  {
    path: "/search",
    element: LazyLoadRoute("../search/pages/Search.tsx"),
  },
  {
    path: "/profile/:username",
    element: LazyLoadRoute("../profile/pages/Profile.tsx"),
  },
  {
    path: "/users",
    element: LazyLoadRoute("../users/pages/Users.tsx"),
  },
  {
    path: "/chats",
    element: LazyLoadRoute("../chats/pages/Chats.tsx"),
  },
  {
    path: "/settings",
    element: LazyLoadRoute("../settings/components/SettingForm.tsx"),
  },
];
