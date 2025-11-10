import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { getProductByBarcode } from "../../services/apiService";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { barcode } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductByBarcode(barcode);
        if (!data) {
          throw new Error("Failed to fetch product");
        }
        console.log("API Response:", data);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [barcode]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  // Color-coding logic for health score and nutrient levels
  const getNutrientColor = (level) => {
    switch (level) {
      case "high":
        return "#F44336"; // Red
      case "moderate":
        return "#FFC107"; // Yellow
      case "low":
        return "#4CAF50"; // Green
      default:
        return "#888"; // Gray
    }
  };

  const getHealthScoreColor = (score) => {
    if (score >= 80) return "#4CAF50"; // Green
    if (score >= 50) return "#FFC107"; // Yellow
    return "#F44336"; // Red
  };

  const nutrientDisplayNames = {
    fat: "Fat",
    "saturated-fat": "Saturated Fat",
    sugars: "Sugars",
    salt: "Salt",
  };

  // Health Warnings for High Nutrient Levels
  const nutrientMessages = {
    fat: {
      high: {
        message:
          "A high consumption of fat can raise cholesterol, increasing the risk of heart diseases.",
        recommendation:
          "Limit the consumption of fat and choose products with lower fat content.",
      },
    },
    "saturated-fat": {
      high: {
        message: "Excess saturated fat can contribute to heart disease.",
        recommendation: "Opt for foods with lower saturated fat content.",
      },
    },
    sugars: {
      high: {
        message:
          "High sugar intake increases the risk of obesity and diabetes.",
        recommendation:
          "Reduce sugary products and prefer natural sugars from fruits.",
      },
    },
    salt: {
      high: {
        message: "Excess salt intake may lead to high blood pressure.",
        recommendation: "Choose products with lower salt content.",
      },
    },
  };

  // Check and handle the structure of your API response
  // Adapt this based on the actual structure of your API response
  const nutrientLevels = product.nutrient_levels || {};
  const nutriments = product.nutriments || {};

  return (
    <>
      <Navbar />
      <div className="product-details-container">
        <div className="product-card">
          <div className="product-card-content">
            <div className="product-image-container">
              <img
                src={product.image_url || "/placeholder.jpg"}
                alt={product.name || "Product"}
                className="product-image"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="product-info-container">
              <h1>{product.name || "Unknown Product"}</h1>
              <p>
                <strong>Brand:</strong> {product.brands || "N/A"}
              </p>
              <p>
                <strong>Categories:</strong> {product.categories || "N/A"}
              </p>
              <p>
                <strong>Ingredients:</strong> {product.ingredients || "N/A"}
              </p>

              {/* Health Score Section */}
              <div className="health-score-section">
                <h3>
                  Health Score:{" "}
                  {product.health_score !== undefined
                    ? product.health_score
                    : "N/A"}
                </h3>
                {product.health_score !== undefined && (
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{
                        width: product.health_score + "%",
                        backgroundColor: getHealthScoreColor(
                          product.health_score
                        ),
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Score Details Section */}
              {product.score_details && (
                <div className="score-details">
                  <p>
                    <strong>Negative Score:</strong>{" "}
                    {product.score_details.negative_score}
                  </p>
                  <p>
                    <strong>Positive Score:</strong>{" "}
                    {product.score_details.positive_score}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Nutrient Levels Section */}
        <div className="nutrient-section">
          <h2>Nutrient Levels</h2>
          {Object.keys(nutrientLevels).length > 0 ? (
            Object.entries(nutrientLevels).map(([key, level]) => (
              <div key={key} className="nutrient-item">
                <div className="nutrient-header">
                  <span
                    className="nutrient-icon"
                    style={{ backgroundColor: getNutrientColor(level) }}
                  />
                  <span className="nutrient-text">
                    {nutrientDisplayNames[key] || key} in {level} quantity (
                    {nutriments && nutriments[`${key}_100g`] !== undefined
                      ? `${nutriments[`${key}_100g`]}g`
                      : "N/A"}
                    )
                  </span>
                </div>

                {/* High Level Warning Details */}
                {level === "high" && nutrientMessages[key]?.high && (
                  <details>
                    <summary>Why is this high?</summary>
                    <p>
                      <strong>Health Impact:</strong>{" "}
                      {nutrientMessages[key].high.message}
                    </p>
                    <p>
                      <strong>Recommendation:</strong>{" "}
                      {nutrientMessages[key].high.recommendation}
                    </p>
                  </details>
                )}
              </div>
            ))
          ) : (
            <p>No nutrient level data available.</p>
          )}
        </div>

        {/* Nutritional Facts Section */}
        <div className="nutrition-section">
          <h2>Nutritional Facts (Per 100g & Per Serving)</h2>
          {product.nutritional_facts &&
          Object.keys(product.nutritional_facts).length > 0 ? (
            <table className="nutrition-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Per 100g</th>
                  <th>Per Serving</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(product.nutritional_facts)
                  .filter(([key]) => key.endsWith("_100g"))
                  .map(([key, value]) => {
                    const baseName = key.replace("_100g", "");
                    return (
                      <tr key={baseName}>
                        <td>{baseName.replace(/_/g, " ").toUpperCase()}</td>
                        <td>{value || "?"}</td>
                        <td>
                          {product.nutritional_facts[baseName + "_serving"] ||
                            "?"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <p>No nutritional data available.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
