import { useAppDispatch } from '../../../../../services/hooks/redux';

import { logout } from '../../../../../domain';

import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';

interface HeaderNavLinkLoginProps {
  setIsOpen: (isOpen: boolean) => void;
  handleClickLink: React.MouseEventHandler<HTMLAnchorElement>;
}

function HeaderNavLinkLogin({
  handleClickLink,
  setIsOpen,
}: HeaderNavLinkLoginProps) {
  const dispatch = useAppDispatch();

  const handleLogOut = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <>
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
