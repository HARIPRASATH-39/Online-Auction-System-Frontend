import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("password");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("useRole");

    // Update loggedIn state
    setLoggedIn(false);

    // Redirect to the login page
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <span className="logo-text">AuctionSphere</span>
          <span className="logo-icon">
            <i class="fa-solid fa-gavel custom-icon"></i>
          </span>
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="bi bi-house-door-fill me-1"></i>
                Home
              </Link>
            </li>

            {/* Conditional Login/Logout Links */}
            {!loggedIn ? (
              <li className="nav-item">
                <Link to="/login" className="nav-link login-btn">
                  <i className="bi bi-box-arrow-in-right me-1"></i>
                  Login
                </Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn nav-link logout-btn"
                >
                  <i className="bi bi-box-arrow-right me-1"></i>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
