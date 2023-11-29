import { useState, useEffect } from 'react';
import { NavLink, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

// import from the settings' reducers - logout et session
import { logout, session } from '../../store/reducers/settings';

// import compenant for the nav link
import HeaderNavLink from '../HeaderNavLink/HeaderNavLink';

// import some icons
import logo from '../../assets/logo/compass.png';
import burger from '../../assets/menu/hamburger-menu.svg';
import close from '../../assets/menu/close.svg';

function Header() {
  // building a state for listening the click on "deconnexion" button
  const [logOut, setLogOut] = useState(false);
  // getting pseudo state from store
  const user = useAppSelector((state) => state.settings.user);

  // dispatch function for sending actions to the store
  const dispatch = useAppDispatch();

  // local state for opening the burger menu
  const [isOpen, setIsOpen] = useState(false);

  // Call useEffect hook for dispatch session
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
            ? 'absolute inset-0 z-50 mt-16 flex flex-col justify-center items-center p-8 space-y-8 bg-white'
            : 'hidden xl:block'
        }
      >
        <HeaderNavLink to="/presentation" onClick={handleClick}>
          Comment jouer ?
        </HeaderNavLink>
        <HeaderNavLink to="/circuits" onClick={handleClick}>
          Parcours
        </HeaderNavLink>
        <HeaderNavLink to="/info" onClick={handleClick}>
          Informations pratiques
        </HeaderNavLink>
        {!user || !user.verified ? (
          <>
            <HeaderNavLink to="/login" onClick={handleClick}>
              Connexion
            </HeaderNavLink>
            <HeaderNavLink
              classNoActive="lg:border lg:rounded-md lg:p-1 lg:border-primary lg:bg-primary lg:text-white"
              classActiv="lg:border lg:rounded-md lg:p-1 lg:border-primary lg:bg-primary lg:text-white"
              to="/register"
              onClick={handleClick}
            >
              S&apos;inscrire
            </HeaderNavLink>
          </>
        ) : (
          <>
            {user && user.role === 'admin' ? (
              <HeaderNavLink to="/admin" onClick={handleClick}>
                Dashboard
              </HeaderNavLink>
            ) : null}
            <HeaderNavLink to="/profile" onClick={handleClick}>
              Profil
            </HeaderNavLink>
            <HeaderNavLink to="/register" onClick={handleLogOut}>
              Déconnexion
            </HeaderNavLink>
          </>
        )}
        {logOut ? <Navigate to="/" /> : null}
      </nav>
    </header>
  );
}

export default Header;
