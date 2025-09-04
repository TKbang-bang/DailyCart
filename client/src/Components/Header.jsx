import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Cart, MenuBars, Search, XClose } from "../utils/SVG";
import "./components.css";

function Header() {
  const [yes, setYes] = useState(false);

  return (
    <>
      <header>
        <div className="up">
          <Link to={"/"} className="logo">
            <h1>DailyMarket</h1>
          </Link>

          <article className="mobile">
            <span
              className="bars"
              onClick={() => (
                document
                  .getElementsByClassName("mobile")[0]
                  .classList.add("active"),
                document
                  .getElementsByClassName("nav")[0]
                  .classList.add("active")
              )}
            >
              <MenuBars />
            </span>
            <span
              className="close"
              onClick={() => (
                document
                  .getElementsByClassName("mobile")[0]
                  .classList.remove("active"),
                document
                  .getElementsByClassName("nav")[0]
                  .classList.remove("active")
              )}
            >
              <XClose />
            </span>
          </article>

          <nav className="nav">
            <ul className="menu">
              <li>
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/about"}>About us</NavLink>
              </li>
              <li>
                <NavLink to={"/contact"}>Contact</NavLink>
              </li>
            </ul>

            {yes && (
              <Link to={"/cart"} className="cart">
                <Cart />
                <span className="count">0</span>
              </Link>
            )}

            <ul className="auth">
              {!yes ? (
                <>
                  <li>
                    <Link to={"/login"} className="login">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to={"/signup"} className="signup">
                      Sign up
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button className="logout">Logout</button>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <article className="search">
          <form>
            <input type="text" placeholder="Search..." />
            <button type="submit">
              <Search />
            </button>
          </form>
        </article>
      </header>

      <section className="prev">
        <img src="/super-market.jpg" alt="" />
        <div className="overlay">
          <div className="overlay-content">
            <h1>Welcome to DailyMarket</h1>
            <p>
              Fresh groceries, everyday essentials, and the best prices right at
              your fingertips. Experience shopping made simple and fast.
            </p>
            <p>
              Enjoy seasonal fruits, organic vegetables, quality meats, and a
              wide variety of household products all in one place.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Header;
