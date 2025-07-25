import React from "react";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${product.barcode}`);
  };

  return (
    <div className="productList-card" onClick={handleClick}>
      <img
        src={product.image_url}
        alt={product.name}
        className="productList-image"
      />
      <h3 className="productList-name">{product.name}</h3>
    </div>
  );
};

export default ProductCard;
