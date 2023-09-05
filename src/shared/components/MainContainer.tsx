import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toggleLeftSidebar } from "src/store/ui";

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { isLeftSidebarOpen } = useSelector(({ ui }) => ui);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onToggleLeftSidebar = (): void => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <div className="lg:pl-[350px] lg:pr-[350px] h-full w-full min-w-min">
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
