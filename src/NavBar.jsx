import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import userContext from "./userContext";

/** global navigation bar, renders different NavLinks depending on if
 * current user is present
 *
 * Props: None
 *
 * State: None
 *
 * App -> JobCardList -> {NavLink*4 if logged in OR NavLink*2 if not}
 */
function NavBar({ logout }) {
  const { user } = useContext(userContext);

  function handleLogout() {
    logout();
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Friender
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <div className="navbar-nav ms-auto">
              <NavLink to="/swipe" className="nav-link">
                Swipe
              </NavLink>
              <NavLink to="/matches" className="nav-link">
                Matches
              </NavLink>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
              <NavLink to="/" className="nav-link" onClick={handleLogout}>
                Log out
              </NavLink>
            </div>
          ) : (
            <div className="navbar-nav ms-auto">
              <NavLink to="/login" className="nav-link">
                Login
              </NavLink>
              <NavLink to="/signup" className="nav-link">
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
