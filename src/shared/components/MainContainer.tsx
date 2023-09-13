import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useTypedSelector } from "src/store";
import { toggleLeftSidebar } from "src/store/ui";

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { isLeftSidebarOpen } = useTypedSelector(({ ui }) => ui);
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const onToggleLeftSidebar = (): void => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <div className="main-container">
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
