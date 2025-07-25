import React, { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import foodImage from "../../assets/images/FoodAnalysisHomePage.png";
import cosmeticImage from "../../assets/images/CosmeticsHomePage.png";
import cloudGreen from "../../assets/images/Vector.png";
import cloudPink from "../../assets/images/cosmeticWave.png";
import circleGreen from "../../assets/images/rightCircleHeroFood.svg";
import circlePink from "../../assets/images/pinkCircle.svg";
import foodW from "../../assets/icons/foodIconW.svg";
import foodB from "../../assets/icons/foodIconB.svg";
import cosW from "../../assets/icons/cosIconW.svg";
import cosB from "../../assets/icons/cosIconB.svg";

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="home"
      className="container-fluid d-flex align-items-center position-relative hero-section"
      style={{
        padding: "5vw",
        backgroundColor: "#F8F9FA",
        minHeight: "100vh",
        overflow: "hidden",
        zIndex: "0",
      }}
    >
      <img
        src={isHovered ? cloudPink : cloudGreen}
        alt="Cloud"
        className="position-absolute cloud-svg"
        style={{
          top: "0%",
          left: "0%",
          width: "46%",
          height: "94%",
          zIndex: "-1",
          transition: "0.3s ease-in-out",
        }}
      />

      <div className="row w-100">
        <div
          className="col-lg-6 d-flex flex-column justify-content-center text-content"
          style={{ position: "relative", zIndex: "1" }}
        >
          <h1
            className="fw-bold"
            style={{
              fontSize: "3rem",
              paddingRight: "30%",
              top: "-6%",
              position: "relative",
              color: "black",
            }}
          >
            Empower. Evaluate. Evolve.
          </h1>
          <p
            className="text-muted fs-5"
            style={{
              paddingRight: "20%",
              position: "relative",
              top: "-4%",
            }}
          >
            Welcome to HealthInspector, the ultimate platform made to provide
            comprehensive reviews and in-depth insights into food and cosmetic
            products, along with a detailed analysis of their potential risks
            and harmful effects.
          </p>
          <div className="d-flex gap-3">
            <Link
              to="/product-list"
              className="btn d-flex align-items-center rounded-pill food-btn"
              style={{
                backgroundColor: isHovered ? "transparent" : "black",
                color: isHovered ? "black" : "white",
                border: isHovered ? "2px solid #E35784" : "2px solid black",
                transition: "0.3s ease-in-out",
                fontSize: "16px",
                fontWeight: "bold",
                padding: "10px 45px",
              }}
            >
              <img
                src={isHovered ? foodB : foodW}
                alt="Food Icon"
                className="me-2"
              />
              <span style={{ paddingTop: "4px", fontSize: "19px" }}>
                Food Analysis
              </span>
            </Link>

            <Link
              to="/cosmetic-analysis"
              className="btn d-flex align-items-center rounded-pill cosmetic-btn"
              style={{
                color: "black",
                border: "2px solid #00A123",
                transition: "0.3s ease-in-out",
                fontWeight: "bold",
                padding: "10px 32px",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <img
                src={isHovered ? cosW : cosB}
                alt="Cosmetic Icon"
                className="me-2"
              />
              <span style={{ paddingTop: "4px", fontSize: "19px" }}>
                Cosmetic Analysis
              </span>
            </Link>
          </div>
        </div>

        <div className="col-lg-6 d-flex justify-content-center position-relative">
          <img
            src={isHovered ? circlePink : circleGreen}
            alt="Background Shape"
            className="position-absolute"
            style={{
              width: "250%",
              height: "200%",
              top: "110%",
              right: "-90%",
              transform: "translateY(-50%)",
              zIndex: "-1",
              transition: "0.3s ease-in-out",
            }}
          />

          <img
            src={foodImage}
            alt="Food Analysis"
            className={`img-fluid rounded-circle position-relative fproduct-image ${
              isHovered ? "food-hover" : "food-return"
            }`}
          />

          <img
            src={cosmeticImage}
            alt="Cosmetic Analysis"
            className={`img-fluid rounded-circle position-relative cproduct-image ${
              isHovered ? "cosmetic-reverse" : "cosmetic-hover"
            }`}
          />
        </div>
      </div>

      <style>
        {`
          .cosmetic-btn:hover {
            background-color: black !important;
            color: white !important;
            border: black !important;
          }

          .fproduct-image {
            width: 100%;
            height: 100%;
            top: 25%;
            left: 30%;
            transition: 0.6s ease-in-out;
            clip-path: circle(50% at 50% 50%);
          }

          .cproduct-image {
            width: 100%;
            height: 100%;
            top: 26%;
            right: 48%;
            transition: 0.6s ease-in-out;
            clip-path: circle(50% at 50% 50%);
          }

          .cosmetic-reverse {
            animation: curvedMoveReverse 0.3s ease-in-out forwards;
          }

          .cosmetic-hover {
            animation: curvedMove 0.3s ease-in-out forwards;
          }

          .food-hover {
            animation: downMove 0.3s ease-in-out forwards;
          }

          .food-return {
            animation: upMove 0.3s ease-in-out forwards;
          }

          @keyframes curvedMove {
            0% { transform: translateX(0px) translateY(0px); }
            10% { transform: translateX(40px) translateY(-50px); }
            20% { transform: translateX(60px) translateY(-100px); }
            30% { transform: translateX(100px) translateY(-150px); }
            40% { transform: translateX(170px) translateY(-200px); }
            50% { transform: translateX(220px) translateY(-250px); }
            60% { transform: translateX(280px) translateY(-280px); }
            70% { transform: translateX(350px) translateY(-300px); }
            80% { transform: translateX(420px) translateY(-320px); }
            85% { transform: translateX(500px) translateY(-350px); }
            90% { transform: translateX(620px) translateY(-360px); }
            95% { transform: translateX(720px) translateY(-360px); }
            100% { transform: translateX(800px) translateY(-350px); }
          }

          @keyframes curvedMoveReverse {
            0% { transform: translateX(800px) translateY(-350px); }
            5% { transform: translateX(720px) translateY(-360px); }
            10% { transform: translateX(620px) translateY(-360px); }
            15% { transform: translateX(500px) translateY(-350px); }
            20% { transform: translateX(420px) translateY(-320px); }
            30% { transform: translateX(350px) translateY(-300px); }
            40% { transform: translateX(280px) translateY(-280px); }
            50% { transform: translateX(220px) translateY(-250px); }
            60% { transform: translateX(170px) translateY(-200px); }
            70% { transform: translateX(100px) translateY(-150px); }
            80% { transform: translateX(60px) translateY(-100px); }
            90% { transform: translateX(40px) translateY(-50px); }
            100% { transform: translateX(0px) translateY(0px); }
          }

          @keyframes downMove {
            0% { transform: translate(0px, 0px); }
            10% { transform: translate(-5px, 30px); }
            20% { transform: translate(-5px, 50px); }
            30% { transform: translate(-8px, 60px); }
            40% { transform: translate(-10px, 100px); }
            50% { transform: translate(-10px, 150px); }
            60% { transform: translate(-15px, 200px); }
            70% { transform: translate(-18px, 230px); }
            80% { transform: translate(-20px, 280px); }
            90% { transform: translate(-30px, 300px); }
            95% { transform: translate(-50px, 370px); }
            100% { transform: translate(-60px, 560px); }
          }

          @keyframes upMove {
            0% { transform: translate(-60px, 560px); }
            5% { transform: translate(-50px, 370px); }
            10% { transform: translate(-30px, 300px); }
            20% { transform: translate(-20px, 280px); }
            30% { transform: translate(-18px, 230px); }
            40% { transform: translate(-15px, 200px); }
            50% { transform: translate(-10px, 150px); }
            60% { transform: translate(-10px, 100px); }
            70% { transform: translate(-8px, 60px); }
            80% { transform: translate(-5px, 50px); }
            90% { transform: translate(-5px, 30px); }
            100% { transform: translate(0px, 0px); }
}

        `}
      </style>
    </section>
  );
};

export default Hero;
