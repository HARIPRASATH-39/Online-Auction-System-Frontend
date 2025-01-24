import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "../css/UserDashboard.css"; // Custom CSS for User Dashboard

const UserDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/auction/product/findAll"
        );
        setProducts(response.data);
        setError(null);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(response.data.map((product) => product.category)),
        ];
        setCategories(["All", ...uniqueCategories]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Construct image URL based on product name
  const getImageUrl = (productId) => {
    return `http://localhost:8081/auction/product/image/${productId}`;
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

  return (
    <div className="container-fluid p-0">
      {/* Sidebar and Main Content */}
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 custom-sidebar bg-dark text-white min-vh-100 p-3">
          <h3 className="text-center mb-4">User Panel</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/User/UserProfile" className="nav-link text-white">
                <i className="bi bi-person-circle me-2"></i>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/User/MyProducts" className="nav-link text-white">
                <i className="bi bi-box me-2"></i>
                My Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h3 className="welcome mb-4 text-white">
            Welcome {localStorage.getItem("username")}
          </h3>

          {/* Category Filter */}
          <div className="mb-4">
            <label htmlFor="categoryFilter" className="form-label text-white">
              Filter by Category:
            </label>
            <select
              id="categoryFilter"
              className="form-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Product List */}
          {filteredProducts.length === 0 ? (
            <div className="alert alert-info text-center">
              No products found in the selected category.
            </div>
          ) : (
            <div className="row">
              {filteredProducts.map((product) => (
                <div key={product.productId} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm custom-card">
                    {/* Image Container with Overlay */}
                    <div
                      className={`image-container ${
                        product.status === "sold" ? "sold" : ""
                      }`}
                    >
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
                    <div className="card-body">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="card-text">Price: ₹ {product.price}</p>
                      <p className="card-text">Category: {product.category}</p>
                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/Seller/ProductDetails/${product.productId}`} // Navigate to ProductDetails
                          className="btn btn-info"
                        >
                          View Details
                        </Link>
                        {/* Hide "Place Bid" button if product is sold */}
                        {product.status !== "sold" && (
                          <Link
                            to={`/User/AuctionPlatform/${product.productId}`}
                            className="btn btn-primary"
                          >
                            Place Bid
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
