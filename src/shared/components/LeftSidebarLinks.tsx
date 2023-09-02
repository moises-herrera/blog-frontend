import { NavLink } from '.';
import { LinkItems } from 'src/shared/services';

export const LeftSidebarLinks = () => {
  return (
    <ul>
      {LinkItems.map(({ ...props }) => (
        <li className="text-white">
          <NavLink {...props} />
        </li>
      ))}
    </ul>
  );
};
