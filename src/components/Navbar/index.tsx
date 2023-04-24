import React, { memo } from "react";
import { NavLink } from "react-router-dom";
import useInitial from "../../hooks/useInitial";
import "./styles.scss";

const Navbar = () => {
  const { users, authUser, handleLogin } = useInitial();

  const navLinkClass = ({ isActive }: any) => {
    return isActive ? "nav-link activated" : "nav-link";
  };

  return (
    <div className="p-navbar">
      <div className="p-navbar-left">
        <ul className="p-menu">
          <li className="p-menu-item">
            <NavLink to={"/"} end className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li className="p-menu-item">
            <NavLink to={"/add"} className={navLinkClass}>
              New Question
            </NavLink>
          </li>
          <li className="p-menu-item">
            <NavLink to={"/leaderboard"} className={navLinkClass}>
              Leader Board
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="p-navbar-right">
        {authUser && (
          <>
            <div>
              Hello, {(users as any)[authUser]?.name}
              <img src={(users as any)[authUser]?.avatarURL} />
            </div>
            <div className="p-navbar-logout" onClick={() => handleLogin("")}>
              Logout
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Navbar);
