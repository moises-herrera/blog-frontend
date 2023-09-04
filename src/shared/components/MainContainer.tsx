import { useDispatch, useSelector } from 'react-redux';
import { toggleLeftSidebar } from 'src/store/ui';

interface MainContainerProps {
  children: React.ReactNode;
}

export const MainContainer = ({ children }: MainContainerProps) => {
  const { isLeftSidebarOpen } = useSelector(({ ui }) => ui);
  const dispatch = useDispatch();

  const onToggleLeftSidebar = (): void => {
    dispatch(toggleLeftSidebar());
  };

  return (
    <div className="lg:pl-[350px] h-full w-full min-w-min">
      <button
        type="button"
        onClick={onToggleLeftSidebar}
        className={`lg:hidden absolute z-50 top-5 right-5 ${
          isLeftSidebarOpen ? 'text-white' : ''
        }`}
      >
        <i className="fa-solid fa-bars text-3xl"></i>
      </button>

      {children}
    </div>
  );
};
