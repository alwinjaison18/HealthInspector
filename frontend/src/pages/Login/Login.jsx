import React from "react";
import "./Login.css";
import logo from "../../assets/icons/logo.svg";
import bgImage from "../../assets/images/login-image.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        {/* Left Side - Login Form */}
        <div className="login-left">
          <Link to="/" className="logo-link">
            <img src={logo} alt="Health Inspector Logo" className="logo" />
          </Link>
          <h2>Login</h2>
          <p>Welcome back! Please login to your account.</p>

          <form className="login-form">
            <label htmlFor="email">User Name</label>
            <input
              type="email"
              id="email"
              placeholder="Justinebieber@gmail.com"
            />

            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="**********" />

            {/* ✅ FIXED - Properly aligned Remember Me & Forgot Password */}
            <div className="login-options">
              <label className="remember-me">
                <input type="checkbox" id="remember" />
                Remember me
              </label>
              <a href="/">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

          <p className="signup-text">
            Don't have an account? <a href="/">Signup</a>
          </p>
        </div>

        {/* Right Side - Background Image */}
        <div className="login-right">
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

export default Login;
