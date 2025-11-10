import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getProductByBarcode } from "../../services/apiService";
import "./ProductList.css";
import doritosImage from "../../assets/images/doritto.png";
import chipsImage from "../../assets/images/chip.png";
import prodbg from "../../assets/images/prodBg.png";
import search from "../../assets/images/searchIc.png";

const ProductList = () => {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Adjust padding to prevent navbar overlap
  useEffect(() => {
    const adjustPadding = () => {
      const navbar = document.querySelector(".navbar");
      const header = document.querySelector(".header-section");

      if (navbar && header) {
        header.style.paddingTop = `${navbar.offsetHeight + 10}px`;
      }
    };

    adjustPadding();
    window.addEventListener("resize", adjustPadding);
    return () => window.removeEventListener("resize", adjustPadding);
  }, []);

  const fetchProductByBarcode = async () => {
    if (!barcode.trim()) return; // Don't search if barcode is empty

    setLoading(true);
    setError("");
    try {
      const data = await getProductByBarcode(barcode);
      if (!data) {
        throw new Error("Product not found.");
      }
      setProduct(data);
    } catch (err) {
      setError(err.message);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchProductByBarcode();
    }
  };

  return (
    <>
      <Navbar />
      <div className="product-list">
        <div className="header-section">
          <img src={doritosImage} alt="Doritos" className="doritos-img" />
          <p className="food-text">FOOD</p>
          <img src={prodbg} alt="bg" className="bg-img" />
          <div className="search-area">
            <h1 className="title">Food Analysis</h1>
            <p className="subtitle">
              Search for any food product to reveal its ingredients and impact
            </p>
            <div className="search-container">
              <input
                type="text"
                placeholder="Enter a product to analyze..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                onKeyPress={handleKeyPress}
                className="search-input"
              />
              <button onClick={fetchProductByBarcode} className="search-button">
                <img src={search} alt="Search" className="search-icon" />
              </button>
            </div>
          </div>
          <img src={chipsImage} alt="Chips" className="chips-img" />
        </div>

        {loading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {product ? (
          <div className="product-container">
            <ProductCard product={product} />
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="no-results">No results found. Try another barcode.</p>
          )
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductList;
