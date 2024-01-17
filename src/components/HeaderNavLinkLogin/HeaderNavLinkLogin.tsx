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
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <>
      {user?.role === 'admin' && (
        <HeaderNavLink
          to="/admin"
          onClick={handleClickLink}
          className="lg:px-4"
          classNameActive="active"
          label="Dashboard"
        />
      )}
      <HeaderNavLink
        to="/profile"
        onClick={handleClickLink}
        className="lg:px-4"
        classNameActive="active"
        label="Profil"
      />
      <HeaderNavLink
        to="/login"
        onClick={handleLogOut}
        className="lg:px-4"
        classNameActive="active"
        label="Déconnexion"
      />
    </>
  );
}

export default HeaderNavLinkLogin;
