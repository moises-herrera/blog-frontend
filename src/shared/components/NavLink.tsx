import { Link } from 'react-router-dom';
import { LinkItem } from 'src/interfaces';

export const NavLink = ({ path, label, icon }: LinkItem) => {
  return (
    <Link className="flex gap-2" to={path}>
      {icon && (
        <span>
          <i className={icon}></i>
        </span>
      )}
      <span>{label}</span>
    </Link>
  );
};
