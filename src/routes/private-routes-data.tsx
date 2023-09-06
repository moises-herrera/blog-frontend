import { Feed } from "src/feed/pages";
import { RouteData } from "src/interfaces";
import { Profile } from "src/profile/pages";
import { SettingForm } from "src/settings/components";

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
