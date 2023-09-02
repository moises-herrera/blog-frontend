import { NavLink } from '.';
import { LinkItems } from 'src/shared/services';

export const LeftSidebarLinks = () => {
  return (
    <ul className="flex flex-col gap-2">
      {LinkItems.map(({ ...props }) => (
        <li className="text-white">
          <NavLink {...props} />
        </li>
      ))}
    </ul>
  );
};
