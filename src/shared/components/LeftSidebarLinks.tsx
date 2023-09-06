import { useDispatch } from "react-redux";
import { NavLink } from ".";
import { linkItems } from "src/shared/services";
import { toggleNewPostFormVisibility } from "src/store/post";
import { closeLeftSidebar } from "src/store/ui";

export const LeftSidebarLinks = () => {
  const dispatch = useDispatch();

  const onClickNavLink = (): void => {
    dispatch(closeLeftSidebar());
  };

  const onClickNewPost = (): void => {
    dispatch(toggleNewPostFormVisibility());
    dispatch(closeLeftSidebar());
  };

  return (
    <nav className="flex flex-col text-lg text-white">
      <ul className="flex flex-col gap-2">
        {linkItems.slice(0, 2).map(({ ...props }) => (
          <li key={props.path} onClick={onClickNavLink}>
            <NavLink {...props} />
          </li>
        ))}

        <button onClick={onClickNewPost} className="flex items-center gap-2">
          <span>
            <i className="fa-solid fa-square-plus"></i>
          </span>
          <span>Nuevo Post</span>
        </button>

        {linkItems.slice(2).map(({ ...props }) => (
          <li key={props.path} onClick={onClickNavLink}>
            <NavLink {...props} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
