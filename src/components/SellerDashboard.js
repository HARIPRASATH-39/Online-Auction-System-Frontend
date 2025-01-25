import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "../css/SellerDashboard.css"; // Custom CSS for Seller Dashboard

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const [productToDelete, setProductToDelete] = useState(null); // State to store the product to delete
  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("token");

  // Fetch products for the seller
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auction/product/user/${userId}`
        );
        setProducts(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        toast.error("Failed to fetch products. Please try again later."); // Show error toast
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  // Handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:8081/auction/product/delete/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(
        products.filter((product) => product.productId !== productId)
      );
      toast.success("Product deleted successfully!"); // Show success toast
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product. Please try again."); // Show error toast
    }
  };

  // Handle delete button click
  const handleDeleteClick = (productId) => {
    setProductToDelete(productId); // Set the product ID to delete
    setShowConfirmation(true); // Show the confirmation dialog
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    if (productToDelete) {
      handleDeleteProduct(productToDelete); // Proceed with deletion
    }
    setShowConfirmation(false); // Close the confirmation dialog
    setProductToDelete(null); // Reset the product to delete
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    setProductToDelete(null); // Reset the product to delete
  };

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
      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
      />

      {/* Sidebar and Main Content */}
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 custom-sidebar bg-dark text-white min-vh-100 p-3">
          <h3 className="text-center mb-4">Seller Panel</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/User/UserProfile" className="nav-link text-white">
                <i className="bi bi-person-circle me-2"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link
                to="/Seller/ListAllCategories"
                className="nav-link text-white"
              >
                <i className="bi bi-tags me-2"></i>
                Categories
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h3 className="welcome mb-4 text-white">
            Welcome {sessionStorage.getItem("username")}
          </h3>

          {/* Add Product Button */}
          <div className="text-center mb-4">
            <Link to="/Seller/AddProduct" className="btn btn-primary">
              Add Product
            </Link>
          </div>

          {/* Product List */}
          {products.length === 0 ? (
            <div className="alert alert-info text-center">
              No products added. Click "Add Product" to get started.
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <div key={product.productId} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm custom-card">
                    {/* Image Container with Overlay */}
                    <div className="image-container">
                      <img
                        src={getImageUrl(product.productId)} // Fetch image from the backend
                        alt={product.productName}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/fallback.jpg"; // Fallback image if the fetch fails
                        }}
                      />
                      {/* SOLD Overlay */}
                      {product.status === "sold" && (
                        <div className="sold-overlay">SOLD</div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="card-body">
                      <h5 className="card-title text-black">
                        {product.productName}
                      </h5>
                      <p className="card-text text-black">
                        Price: ₹ {product.price}
                      </p>
                      <p className="card-text text-black">
                        Category: {product.category}
                      </p>
                      <div className="d-flex justify-content-between">
                        {/* View Details Button with Icon */}
                        <Link
                          to={`/Seller/ProductDetails/${product.productId}`}
                          className="btn btn-info btn-icon"
                        >
                          <i className="bi bi-eye"></i> {/* Eye Icon */}
                        </Link>
                        {/* Delete Button with Icon */}
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => handleDeleteClick(product.productId)}
                        >
                          <i className="bi bi-trash"></i> {/* Trash Icon */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this product?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirmDelete}>
                Yes
              </button>
              <button className="cancel-button" onClick={handleCancelDelete}>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
