import { Sidebar, FollowersList, FollowingList } from "src/shared/components";
import "./RightSidebar.css";

export const RightSidebar = () => {
  return (
    <Sidebar
      align="right"
      cssClass="hidden lg:block lg:border-l lg:border-gray-500 pt-10 pb-3"
    >
      <FollowingList />
      <FollowersList />
    </Sidebar>
  );
};
