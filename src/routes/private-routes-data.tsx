import { Feed } from "src/feed/pages";
import { RouteData } from "src/interfaces";
import { Profile } from "src/profile/pages";
import { Search } from "src/search/pages";
import { SettingForm } from "src/settings/components";
import { Users } from "src/users/pages";
import { Chats } from "src/chats/pages";

/**
 * Private routes data.
 */
export const privateRoutesData: RouteData[] = [
  {
    path: "/",
    element: <Feed />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/profile/:username",
    element: <Profile />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/chats",
    element: <Chats />,
  },
  {
    path: "/settings",
    element: <SettingForm />,
  },
];
