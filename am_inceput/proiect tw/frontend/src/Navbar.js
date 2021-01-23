import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/alimente" className="link">
            Alimentele mele
          </NavLink>
        </li>
        <li>
          <NavLink to="/prieteni" className="link">
            Prieteni
          </NavLink>
        </li>
        <li>
          <NavLink to="/adaugaAliment" className="link">
            Adauga Aliment
          </NavLink>
        </li>
        <li>
          <NavLink to='/adaugaPrieten' className="link">
            Adauga Prieten
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
