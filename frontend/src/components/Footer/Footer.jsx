import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import {
  FaPhone,
  FaEnvelope,
  FaClock,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/images/logo-white.png";
import paymentLogo from "../../assets/images/payment.png";

const Footer = () => {
  return (
    <footer className="footer bg-black text-white py-5">
      <div id="footer" className="container-fluid px-5">
        {/* First Row - Logo & Empty Columns */}
        <div className="row mb-3">
          <div className="col-md-3 d-flex align-items-start">
            <img src={logo} alt="Health Inspector" className="logo-img" />
          </div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
          <div className="col-md-3"></div>
        </div>

        {/* Second Row - Footer Content (4 Columns) */}
        <div className="row py-3">
          {/* Left Section - Contact Info */}
          <div className="col-md-3 ">
            <div className="footer-info">
              <p>
                <FaMapMarkerAlt className="icon" /> Address: 1762 School House
                Road
              </p>
              <p>
                <FaPhone className="icon" /> Call Us: 1233-777
              </p>
              <p>
                <FaEnvelope className="icon" /> Email:
                healthinspector@contact.com
              </p>
              <p>
                <FaClock className="icon" /> Work hours: 8:00 - 20:00, Sunday -
                Thursday
              </p>
            </div>
          </div>

          {/* Middle Section - Links (3 Columns) */}
          <div className="col-md-3 px-5">
            <h5 className="fw-bold">Account</h5>
            <ul className="list-unstyled">
              <li>Profile</li>
              <li>History</li>
              <li>Payments</li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="fw-bold">Useful Links</h5>
            <ul className="list-unstyled">
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col-md-3 px-5">
            <h5 className="fw-bold">Help Center</h5>
            <ul className="list-unstyled">
              <li>Payments</li>
              <li>Refund</li>
              <li>Checkout</li>
              <li>Q&A</li>
              <li>Privacy Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Section - Updated Order: Copyright (Right) → Payment Logo (Middle) → Social Links (Left) */}
        <div className="row pt-3 border-top border-secondary d-flex align-items-center text-center">
          {/* Copyright (Right) */}
          <div className="col-md-4 text-md-start">
            <p className="m-0">© 2024, All rights reserved</p>
          </div>

          {/* Payment Logo (Middle) */}
          <div className="col-md-4 text-center">
            <img
              src={paymentLogo}
              alt="Payment Methods"
              className="payment-img"
            />
          </div>

          {/* Social Media Icons (Left) */}
          <div className="col-md-4 text-md-end">
            <div className="social-icons">
              <FaFacebook className="social-icon mx-2" />
              <FaLinkedin className="social-icon mx-2" />
              <FaInstagram className="social-icon mx-2" />
              <FaTwitter className="social-icon mx-2" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
