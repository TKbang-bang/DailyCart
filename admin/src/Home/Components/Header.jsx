import React, { useContext } from "react";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import "./components.css";

function Header() {
  const user = useContext(UserContext);

  return (
    <header>
      <Link to={"/"} className="logo">
        <h1>{user.role} Panel</h1>
      </Link>

      <h3 className="name">{user.name}</h3>

      <button className="logout">Log out</button>
    </header>
  );
}

export default Header;
