import React, { useState } from "react";

import MenuButton from "./MenuButton/MenuButton.component";
// import useDocumentScrollThrottled from '../DocumentScrollThrottle';

import "./Navbar.styles.scss";

const Navbar = ({ logo, menuItems }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const inverseMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar-container">
      <nav className="nav">
        <div
          className={"overlay" + (menuOpen ? " add_overlay" : "")}
          onClick={menuOpen ? inverseMenu : null}
        ></div>

        <div className="nav-container">
          <div className="logo">
            <a href="/">{logo}</a>
          </div>
          <MenuButton onClick={inverseMenu} />
          <div className={"menu" + (menuOpen ? " menu_open" : "")}>
            <ul>
              {menuItems.map((item, index) => (
                <li className="menu-item" key={index}>
                  <a href={item.address}>{item.name}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
