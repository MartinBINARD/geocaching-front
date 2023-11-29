import { NavLink } from 'react-router-dom';

// building a component for the header that will utilize daisyUI and Tailwind for each NavLink
// eslint-disable-next-line react/prop-types
function HeaderNavLink({ to, children, onClick, classNoActive, classActiv }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive
          ? `lg:px-4 link link-hover font-bold ${classActiv}`
          : `lg:px-4 link link-hover ${classNoActive}`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
}

export default HeaderNavLink;
