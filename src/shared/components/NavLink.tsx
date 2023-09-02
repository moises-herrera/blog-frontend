import { Link } from 'react-router-dom';
import { LinkItem } from 'src/interfaces';

export const NavLink = ({ path, label, icon }: LinkItem) => {
  return (
    <Link to={path}>
      <i className={icon}></i>
      <span>{label}</span>
    </Link>
  );
};
