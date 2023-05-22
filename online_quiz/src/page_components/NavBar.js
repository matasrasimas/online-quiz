import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";
import React, { useContext } from "react";
import QuizHub_Icon from "../assets/QH_icon.jpg";
import Close_icon from "../assets/close.png";
import Hamburger_icon from "../assets/hamburger-menu.png";
import Sun_icon from "../assets/sun.png";
import Moon_icon from "../assets/moon.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

export default function NavBar() {
  const { isLoggedIn, loggedUser, setIsLoggedIn, setLoggedUser } =
    useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogOut = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
  };

  return (
    <header id="navigation-header" className="primary-header bg-neutral-900">
      <div className="container">
        <div className="nav-wrapper">
          <CustomLink to="/HomePage">
            <img src={QuizHub_Icon} alt="QuizHub" className="icon-QuizHub" />
          </CustomLink>
          <button onClick={expandMobileNav} className="mobile-nav-toggle">
            <img
              src={Hamburger_icon}
              alt=""
              className="icon-hamburger"
              aria-hidden="true"
            />
            <img
              src={Close_icon}
              alt=""
              className="icon-close"
              aria-hidden="true"
            />
            <span className="visually-hidden">Menu</span>
          </button>
          <nav className="primary-navigation" id="primary-navigation">
            <ul role="list" className="nav-list">
              <CustomLink to="/HomePage">Home</CustomLink>
              <CustomLink to="/AboutPage">About Us</CustomLink>
              <CustomLink to="/HowToPage">How To</CustomLink>
              <CustomLink to="/QuizPage">Quizzes</CustomLink>

              {isLoggedIn ? (
                <span className="visually-hidden">empty</span>
              ) : (
                <CustomLink to="/LogInPage">Log in</CustomLink>
              )}

              {isLoggedIn && (
                <div className="secondary-navigation">
                  <button
                    onClick={handleDropDown}
                    className="drop-down-link-button fw-bold"
                  >
                    {`Hello, ${loggedUser.name}! `}
                    <i class="fa-solid fa-circle-user"></i>
                    <span className="visually-hidden">User menu toggle</span>
                  </button>
                  <div className="secondary-navigation-content fw-bold">
                    <Link to="/HomePage" onClick={handleLogOut}>
                      Log out
                    </Link>
                  </div>
                </div>
              )}
            </ul>
          </nav>
          <button onClick={toggleDarkMode} className="theme-toggle-button">
            <img
              src={Sun_icon}
              alt=""
              className="icon-sun"
              aria-hidden="true"
            />
            <img
              src={Moon_icon}
              alt=""
              className="icon-moon"
              aria-hidden="true"
            />
            <span className="visually-hidden">Dark/light mode toggle</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: false });

  return (
    <la className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </la>
  );
}

function expandMobileNav() {
  document.querySelector(".primary-navigation").toggleAttribute("data-visible");
  document.querySelector(".icon-hamburger").toggleAttribute("data-visible");
  document.querySelector(".icon-close").toggleAttribute("data-visible");
  document.querySelector(".primary-header").toggleAttribute("data-overlay");
  document.querySelector(".mobile-nav-toggle").toggleAttribute("data-overlay");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
  document.querySelector(".icon-sun").toggleAttribute("dark-mode");
  document.querySelector(".icon-moon").toggleAttribute("dark-mode");

  document.querySelector(".register-link").toggleAttribute("dark-mode");
}

function handleDropDown() {
  document
    .querySelector(".secondary-navigation-content")
    .classList.toggle("active");
}
