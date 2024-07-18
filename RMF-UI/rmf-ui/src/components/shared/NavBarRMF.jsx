import React from "react";
import { useHistory } from "react-router-dom";
import "./NavBarRMF.css";
const NavBarRMF = () => {
  const history = useHistory();

  return (
    <nav className="navbar">
      <div className="navbar__brand">Find Your Perfect Room Partner</div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <span
            className="items"
            onClick={() => {
              history.push("/rmf/post_room");
            }}
          >
            Post Room
          </span>
        </li>
        <li className="navbar__item">
          <span
            className="items"
            onClick={() => {
              history.push("/rmf/all_rooms");
            }}
          >
            All Rooms
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default NavBarRMF;
