import { Sidebar, FollowersList, FollowingList } from "src/shared/components";
import "./RightSidebar.css";
import { useTypedSelector } from "src/store";

export const RightSidebar = () => {
  const { isRightSidebarOpen } = useTypedSelector(({ ui }) => ui);
  return (
    <>
      {isRightSidebarOpen && (
        <Sidebar
          align="right"
          cssClass="hidden lg:block lg:border-l lg:border-gray-500 pt-10 pb-3"
        >
          <div className="space-y-5">
            <FollowingList />
            <FollowersList />
          </div>
        </Sidebar>
      )}
    </>
  );
};
