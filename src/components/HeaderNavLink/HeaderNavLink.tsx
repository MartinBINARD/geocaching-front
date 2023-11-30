import { NavLink } from 'react-router-dom';

interface HeaderNavLinkProps {
  to: string;
  label: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
  className: string;
  classNameActive: string;
}

function HeaderNavLink({
  to,
  label,
  onClick,
  className,
  classNameActive,
}: HeaderNavLinkProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${classNameActive} ${className}` : `${className}`
      }
      onClick={onClick}
    >
      {label}
    </NavLink>
  );
}

export default HeaderNavLink;
