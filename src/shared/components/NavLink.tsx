import { Link } from "react-router-dom";
import { LinkItem } from "src/interfaces";

interface NavLinkProps extends LinkItem {
  className?: string;
}

export const NavLink = ({ path, label, icon, className }: NavLinkProps) => {
  return (
    <Link className={`flex gap-2 items-center w-min ${className}`} to={path}>
      {icon && (
        <span>
          <i className={icon}></i>
        </span>
      )}
      <span>{label}</span>
    </Link>
  );
};
