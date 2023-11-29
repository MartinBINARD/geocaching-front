import { NavLink } from 'react-router-dom';

function HeaderNavLink({ to, children, onClick, className, classNameActive }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? `${classNameActive} ${className}` : `${className}`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default HeaderNavLink;
