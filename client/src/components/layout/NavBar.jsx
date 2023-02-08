import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const stylesNavBar = (nav) =>
    nav.isActive
      ? 'nav-bar--hovered nav-bar-slide--hovered nav-bar'
      : 'nav-bar';
  return (
    <ul className="flex gap-x-5 justify-center items-center w-1/3 text-[18px]">
      <li>
        <NavLink className={stylesNavBar} to="/">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink className={stylesNavBar} to="/message">
          Message
        </NavLink>
      </li>
      <li>
        <NavLink className={stylesNavBar} to="/wall/me">
          About me
        </NavLink>
      </li>
    </ul>
  );
};

export default NavBar;
