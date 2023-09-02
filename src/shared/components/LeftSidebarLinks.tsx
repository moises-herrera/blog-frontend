import { NavLink } from '.';
import { LinkItems } from 'src/shared/services';

export const LeftSidebarLinks = () => {
  return (
    <nav className="flex flex-col text-white text-lg">
      <ul className="flex flex-col gap-2">
        {LinkItems.map(({ ...props }) => (
          <li key={props.path}>
            <NavLink {...props} />
          </li>
        ))}
      </ul>
    </nav>
  );
};
