import React from "react";
import { NavLink } from "react-router-dom";
import "./components.css";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/Products">Products</NavLink>
        </li>

        <li>
          <NavLink to="/createproduct">Create Product</NavLink>
        </li>

        <li>
          <NavLink to="/orders">Orders</NavLink>
        </li>

        <li>
          <NavLink to="/users">Users</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </li>

        <li>
          <NavLink to="/logs">Logs</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
