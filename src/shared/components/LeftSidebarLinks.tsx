import { useDispatch } from "react-redux";
import { NavLink } from ".";
import { linkItems } from "src/shared/services";
import { openNewPostForm } from "src/store/post";
import { closeLeftSidebar } from "src/store/ui";
import { useTypedSelector } from "src/store";

export const LeftSidebarLinks = () => {
  const dispatch = useDispatch();
  const { user } = useTypedSelector(({ auth }) => auth);

  const onClickNavLink = (): void => {
    dispatch(closeLeftSidebar());
  };

  const onClickNewPost = (): void => {
    dispatch(openNewPostForm());
    dispatch(closeLeftSidebar());
  };

  return (
    <nav className="flex flex-col text-lg text-white">
      <ul className="flex flex-col gap-2">
        {linkItems.slice(0, 3).map(({ ...props }) => (
          <li key={props.path} onClick={onClickNavLink}>
            <NavLink
              {...props}
              path={
                props.path.includes(":username")
                  ? props.path.replace(":username", user?.username as string)
                  : props.path
              }
            />
          </li>
        ))}

        <button onClick={onClickNewPost} className="flex items-center gap-2">
          <span>
            <i className="fa-solid fa-square-plus"></i>
          </span>
          <span>Nuevo Post</span>
        </button>

        {linkItems.slice(3).map(({ ...props }) => (
          <li key={props.path} onClick={onClickNavLink}>
            <NavLink {...props} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
