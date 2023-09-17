import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { toggleLeftSidebar } from "src/store/ui";
import { useTypedSelector } from "src/store";

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { isRigthSidebarOpen } = useTypedSelector(({ ui }) => ui);
  const { isLeftSidebarOpen } = useTypedSelector(({ ui }) => ui);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onToggleLeftSidebar = (): void => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <div
      className={
        isRigthSidebarOpen
          ? `main-container`
          : `h-full w-full min-w-min lg:pl-[350px]`
      }
    >
      <button
        type="button"
        onClick={onToggleLeftSidebar}
        className={`lg:hidden fixed z-50 top-5 right-5 ${
          isLeftSidebarOpen || pathname.includes("profile") ? "text-white" : ""
        }`}
      >
        <i className="text-3xl fa-solid fa-bars"></i>
      </button>

      {children}
    </div>
  );
};
