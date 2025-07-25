import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import routing hooks
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/icons/logo.svg";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation(); // Get current URL
  const navigate = useNavigate(); // Navigation function

  // Function to handle scrolling/navigation
  const handleNavClick = (sectionId) => {
    if (location.pathname !== "/") {
      // If not on the home page, navigate to Home first
      navigate("/", { replace: true });

      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100); // Small delay to ensure the page loads
    } else {
      // If already on Home, just scroll
      scrollToSection(sectionId);
    }
  };

  // Smooth scrolling function
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white fixed-top shadow-sm"
      style={{
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        padding: "16px 4.5vw",
      }}
    >
      <div className="container-fluid d-flex justify-content-between">
        {/* Logo navigates to Home */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Health Inspector" width="220" />
        </Link>

        {/* Toggle Button for Mobile */}
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

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          <ul className="navbar-nav gap-5">
            <li className="nav-item">
              <button
                className="nav-link fw-bold text-black border-0 bg-transparent"
                onClick={() => handleNavClick("hero")}
              >
                Home
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-black border-0 bg-transparent"
                onClick={() => handleNavClick("about")}
              >
                About us
              </button>
            </li>
            <li className="nav-item">
              <button
                className="nav-link text-black border-0 bg-transparent"
                onClick={() => handleNavClick("team")}
              >
                Team
              </button>
            </li>
          </ul>
        </div>

        {/* Authentication Links aligned to the right */}
        <div className="d-flex align-items-center">
          <Link to="/signup" className="btn text-dark me-3 fw-semibold">
            Sign up
          </Link>
          <Link
            to="/login"
            className="btn btn-dark px-4 rounded-pill border-0 login-button"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
