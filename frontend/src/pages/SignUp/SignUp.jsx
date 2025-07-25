import React from "react";
import "./Signup.css";
import logo from "../../assets/icons/logo.svg";
import bgImage from "../../assets/images/login-image.png";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        {/* Left Side - Signup Form */}
        <div className="signup-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Health Inspector Logo" className="logo" />
          </Link>
          <h2>Create Account</h2>
          <p>Join us today! Fill in your details to get started.</p>

          <form className="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="John" />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Doe" />
              </div>
            </div>

            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="john.doe@example.com" />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
            />

            <div className="terms-conditions">
              <label className="terms-checkbox">
                <input type="checkbox" id="terms" />I agree to the{" "}
                <a href="/">Terms & Conditions</a> and{" "}
                <a href="/">Privacy Policy</a>
              </label>
            </div>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>
          </form>

          <p className="login-text">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>

        {/* Right Side - Background Image */}
        <div className="signup-right">
          <img
            src={bgImage}
            alt="Crisps Packaging"
            className="background-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
