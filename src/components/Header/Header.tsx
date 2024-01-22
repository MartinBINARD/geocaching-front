import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

import { fetchSession } from '../../store/reducers/auth';

import HeaderNavLink from './HeaderNavLink/HeaderNavLink';
import HeaderNavLinkLogin from './HeaderNavLinkLogin/HeaderNavLinkLogin';

import logo from '../../assets/logo/compass.png';

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchSession());
  }, [dispatch]);

  const stopScrollingModal = (isModalOpen: boolean): void => {
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';
  };

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

  return (
    <header
      className={`top-0 sticky w-full flex flex-col z-20 items-center text-primary text-lg bg-white shadow-md xl:flex-row ${
        isOpen ? 'inset-0 h-screen' : ''
      }`}
    >
      <section className="w-full flex items-center justify-between px-5">
        <NavLink to="/">
          <img className="h-14 my-2" src={logo} alt="caching'o logo" />
        </NavLink>
        <button
          type="button"
          onClick={handleClickHamburgerMenu}
          className="btn btn-primary btn-ghost btn-circle xl:hidden cursor-pointer"
        >
          {isOpen ? (
            <Plus className="w-10 h-10 text-primary rotate-45 xl:w-10 xl:h-10" />
          ) : (
            <Menu className="w-10 h-10 text-primary xl:w-10 xl:h-10" />
          )}
        </button>
      </section>
      <nav
        className={
          isOpen
            ? 'z-50 flex flex-col items-center bg-white p-8 my-auto'
            : 'hidden xl:block'
        }
      >
        <ul className="w-max menu menu-vertical rounded-box max-xl:gap-4 xl:menu-horizontal">
          <HeaderNavLink
            to="/presentation"
            onClick={handleClickLink}
            className="lg:px-4"
            classNameActive="active"
            label="Comment jouer ?"
          />
          <HeaderNavLink
            to="/circuits"
            onClick={handleClickLink}
            className="lg:px-4"
            classNameActive="active"
            label="Parcours"
          />
          <HeaderNavLink
            to="/info"
            onClick={handleClickLink}
            className="lg:px-4"
            classNameActive="active"
            label="Informations pratiques"
          />
          {user?.verified ? (
            <HeaderNavLinkLogin
              setIsOpen={setIsOpen}
              handleClickLink={handleClickLink}
            />
          ) : (
            <>
              <HeaderNavLink
                to="/login"
                onClick={handleClickLink}
                className="lg:px-4"
                classNameActive="active"
                label="Connexion"
              />
              <HeaderNavLink
                to="/register"
                onClick={handleClickLink}
                className="link font-extrabold lg:px-4"
                classNameActive="active"
                label="S'inscrire"
              />
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
