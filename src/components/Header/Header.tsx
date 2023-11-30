import { useState, useEffect, ReactNode } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { logout, session } from '../../store/reducers/settings';

import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';

import logo from '../../assets/logo/compass.png';
import burger from '../../assets/menu/hamburger-menu.svg';
import close from '../../assets/menu/close.svg';

function Header() {
  const [logOut, setLogOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const user = useAppSelector((state) => state.settings.user);

  const dispatch = useAppDispatch();

  const stopScrollingModal = (isModalOpen: boolean): void => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  };

  useEffect(() => {
    dispatch(session());
  }, [dispatch]);

  useEffect(() => {
    stopScrollingModal(isOpen);
  }, [isOpen]);

  const handleClickHamburgerMenu = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleClickLink = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const handleLogOut = () => {
    setLogOut(true);
    localStorage.clear();
    dispatch(logout());
    setIsOpen(false);
  };

  return (
    <header className="flex justify-between px-5 z-20 items-center text-primary text-lg">
      <NavLink to="/">
        <img className="lg:h-20 h-14 mb-2.5" src={logo} alt="caching'o logo" />
      </NavLink>
      <button
        type="button"
        onClick={handleClickHamburgerMenu}
        className="xl:hidden cursor-pointer"
      >
        <img
          className="xl:h-20 h-10"
          src={isOpen ? close : burger}
          alt="burger menu icon"
        />
      </button>
      <nav
        className={
          isOpen
            ? 'absolute inset-0 z-50 mt-16 flex flex-col justify-center items-center p-8 bg-white'
            : 'hidden xl:block'
        }
      >
        <ul className="menu menu-vertical xl:menu-horizontal rounded-box">
          <HeaderNavLink
            to="/presentation"
            onClick={handleClickLink}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Comment jouer ?"
          />
          <HeaderNavLink
            to="/circuits"
            onClick={handleClickLink}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Parcours"
          />
          <HeaderNavLink
            to="/info"
            onClick={handleClickLink}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Informations pratiques"
          />
          {user && user?.verified ? (
            <>
              {user.role === 'admin' ? (
                <HeaderNavLink
                  to="/admin"
                  onClick={handleClickLink}
                  className="lg:px-4 max-lg:my-1"
                  classNameActive="active"
                  label="Dashboard"
                />
              ) : null}
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
          ) : (
            <>
              <HeaderNavLink
                to="/login"
                onClick={handleClickLink}
                className="lg:px-4 max-lg:my-1"
                classNameActive="active"
                label="Connexion"
              />
              <HeaderNavLink
                to="/register"
                onClick={handleClickLink}
                className="link font-extrabold lg:px-4 max-lg:my-1"
                classNameActive="active"
                label="S'inscrire"
              />
            </>
          )}
        </ul>
        {logOut ? <Navigate to="/" /> : null}
      </nav>
    </header>
  );
}

export default Header;
