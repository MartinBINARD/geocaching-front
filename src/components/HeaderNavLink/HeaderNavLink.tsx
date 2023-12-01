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
    <li className={className}>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? classNameActive : '')}
        onClick={onClick}
      >
        {label}
      </NavLink>
    </li>
  );
}

export default HeaderNavLink;
