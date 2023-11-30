import { useState, useEffect } from 'react';
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

  useEffect(() => {
    dispatch(session());
  }, [dispatch]);

  // function to toggle the local state of the burger menu for mobile
  const handleClick = () => {
    if (window.innerWidth < 1280) {
      setIsOpen(!isOpen);
    }
  };
  // function to send logout to the store and disconnect
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
        onClick={handleClick}
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
            onClick={handleClick}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Comment jouer ?"
          />
          <HeaderNavLink
            to="/circuits"
            onClick={handleClick}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Parcours"
          />
          <HeaderNavLink
            to="/info"
            onClick={handleClick}
            className="lg:px-4 max-lg:my-1"
            classNameActive="active"
            label="Informations pratiques"
          />
          {user || user?.verified ? (
            <>
              {user.role === 'admin' ? (
                <HeaderNavLink
                  to="/admin"
                  onClick={handleClick}
                  className="lg:px-4 max-lg:my-1"
                  classNameActive="active"
                  label="Dashboard"
                />
              ) : null}
              <HeaderNavLink
                to="/profile"
                onClick={handleClick}
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
                onClick={handleClick}
                className="lg:px-4 max-lg:my-1"
                classNameActive="active"
                label="Connexion"
              />
              <HeaderNavLink
                to="/register"
                onClick={handleClick}
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
