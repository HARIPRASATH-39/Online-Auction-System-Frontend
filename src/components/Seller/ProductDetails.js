import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./ProductDetails.css"; // Custom CSS for ViewProductDetails

const ViewProductDetails = () => {
  const { productId } = useParams(); // Extract productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch product details
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auction/product/find/${productId}`
        );
        setProduct(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const getImageUrl = (productId) => {
    return `http://localhost:8081/auction/product/image/${productId}`;
  };

  // Check if an image exists at the given URL
  const imageExists = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5 alert alert-danger text-center">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 alert alert-warning text-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="product-details-container">
      <h1 className="product-details-title">PRODUCT DETAILS</h1>

      <div className="product-details-card">
        <div className="row g-0">
          {/* Product Image */}
          <div className="col-md-6">
            <img
              src={getImageUrl(product.productId)} // Fetch image from the backend
              alt={product.productName}
              className="card-img-top"
              style={{ height: "200px", objectFit: "cover" }}
              onError={(e) => {
                e.target.src = "/fallback.jpg"; // Fallback image if the fetch fails
              }}
            />
          </div>

          {/* Product Details */}
          <div className="col-md-6">
            <div className="product-details-body">
              <h3 className="product-name">{product.productName}</h3>
              <div className="product-details">
                <p className="product-text">
                  <strong>Price:</strong> ₹ {product.price}
                </p>
                <p className="product-text">
                  <strong>Category:</strong> {product.category}
                </p>
                <p className="product-text">
                  <strong>Seller:</strong> {product.userName}
                </p>
                <p className="product-text">
                  <strong>Highest Bid:</strong> ₹ {product.highest_bid}
                </p>
                <p className="product-text">
                  <strong>Status:</strong>{" "}
                  <span
                    className={`status-badge ${
                      product.status === "sold" ? "sold" : "unsold"
                    }`}
                  >
                    {product.status}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductDetails;
