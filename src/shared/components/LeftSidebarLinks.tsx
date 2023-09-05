import { useDispatch } from 'react-redux';
import { NavLink } from '.';
import { linkItems } from 'src/shared/services';
import { toggleNewPostFormVisibility } from 'src/store/post';

export const LeftSidebarLinks = () => {
  const dispatch = useDispatch();

  const onClickNewPost = (): void => {
    dispatch(toggleNewPostFormVisibility());
  };

  return (
    <nav className="flex flex-col text-white text-lg">
      <ul className="flex flex-col gap-2">
        {linkItems.slice(0, 2).map(({ ...props }) => (
          <li key={props.path}>
            <NavLink {...props} />
          </li>
        ))}

        <button onClick={onClickNewPost} className="flex gap-2 items-center">
          <span>
            <i className="fa-solid fa-square-plus"></i>
          </span>
          <span>Nuevo Post</span>
        </button>

        {linkItems.slice(2).map(({ ...props }) => (
          <li key={props.path}>
            <NavLink {...props} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
