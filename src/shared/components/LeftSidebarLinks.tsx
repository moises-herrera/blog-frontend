import { useDispatch } from "react-redux";
import { NavLink } from ".";
import { linkItems } from "src/shared/services";
import { openNewPostForm } from "src/store/post";
import {
  closeLeftSidebar,
  openFollowersModal,
  openFollowingModal,
} from "src/store/ui";
import { useTypedSelector } from "src/store";

export const LeftSidebarLinks = () => {
  const dispatch = useDispatch();
  const { user } = useTypedSelector(({ auth }) => auth);

  const onClickNavLink = (): void => {
    dispatch(closeLeftSidebar());
  };

  const onClickNewPost = (): void => {
    dispatch(openNewPostForm());
    onClickNavLink();
  };

  const onClickFollowers = (): void => {
    dispatch(openFollowersModal());
  };

  const onClickFollowing = (): void => {
    dispatch(openFollowingModal());
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

        <button onClick={onClickNewPost} className="sidebar-button">
          <span>
            <i className="fa-solid fa-square-plus"></i>
          </span>
          <span>Nuevo Post</span>
        </button>

        <button onClick={onClickFollowers} className="sidebar-button lg:hidden">
          <span>
            <i className="fa-solid fa-user-check"></i>
          </span>
          <span>Seguidores</span>
        </button>

        <button onClick={onClickFollowing} className="sidebar-button lg:hidden">
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
          <span>Seguidos</span>
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
