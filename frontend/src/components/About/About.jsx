import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";
import aboutImage from "../../assets/images/about-image.png"; // Main left-side image

const About = () => {
  return (
    <section id="about" className="about container-fluid about-section d-flex">
      {/* Left Side - Stuck to the Left */}
      <div className="about-image-container">
        <img src={aboutImage} alt="About Project" className="about-img" />
      </div>

      {/* Right Side - Content with Proper Spacing */}
      <div className="about-content">
        <h2 className="fw-bold">About Project</h2>
        <p className="text-muted">
          Health Inspector is a website dedicated to empowering consumers with
          trustworthy information about food and cosmetic products. Our platform
          enables users to review and explore the safety, quality, and potential
          harms of these products. By fostering transparency and providing
          detailed insights, Health Inspector helps individuals make informed
          choices for their well-being. Join us in creating a healthier and more
          aware community!
        </p>
      </div>
    </section>
  );
};

export default About;
