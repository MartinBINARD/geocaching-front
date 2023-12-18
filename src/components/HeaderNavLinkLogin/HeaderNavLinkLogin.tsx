import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { logout } from '../../store/reducers/auth';

import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';

interface HeaderNavLinkLoginProps {
  setIsOpen: (isOpen: boolean) => void;
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}

function HeaderNavLinkLogin({
  handleClickLink,
  setIsOpen,
}: HeaderNavLinkLoginProps) {
  const [logOut, setLogOut] = useState<boolean>(false);

  const user = useAppSelector((state) => state.settings.user);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    setLogOut(true);
    localStorage.clear();
    dispatch(logout());
    setIsOpen(false);
  };

  if (logOut) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {user?.role === 'admin' && (
        <HeaderNavLink
          to="/admin"
          onClick={handleClickLink}
          className="lg:px-4 max-lg:my-1"
          classNameActive="active"
          label="Dashboard"
        />
      )}
      <HeaderNavLink
        to="/profile"
        onClick={handleClickLink}
        className="lg:px-4 max-lg:my-1"
        classNameActive="active"
        label="Profil"
      />
      <HeaderNavLink
        to="/register"
        onClick={handleLogOut}
        className="lg:px-4 max-lg:my-1"
        classNameActive="active"
        label="Déconnexion"
      />
    </>
  );
}

export default HeaderNavLinkLogin;
