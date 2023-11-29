import { NavLink } from 'react-router-dom';

function HeaderNavLink({ to, label, onClick, className, classNameActive }) {
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
