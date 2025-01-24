import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons

const MyProducts = () => {
  const [bids, setBids] = useState([]); // State to store bidding information
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem("userId");

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  // Fetch bidding information for the current user
  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auction/bid/getbyuser/${userId}`,
          {
            auth: { username, password },
          }
        );
        setBids(response.data); // Set the bidding information
        setError(null);
      } catch (error) {
        console.error("Error fetching user bids:", error);
        setError("Failed to fetch your bids. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserBids();
  }, [userId]);

  // Construct image URL based on product ID
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
            <li className="nav-item mb-3">
              <Link to="/User/MyProducts" className="nav-link text-white">
                <i className="bi bi-box me-2"></i>
                My Products
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h3 className="welcome mb-4 text-white">My Bids</h3>

          {/* Bids List */}
          {bids.length === 0 ? (
            <div className="alert alert-info text-center">
              You haven't placed any bids yet.
            </div>
          ) : (
            <div className="row">
              {bids.map((bid) => (
                <div key={bid.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm custom-card">
                    {/* Image Container */}
                    <div className="image-container">
                      <img
                        src={getImageUrl(bid.productId)} // Fetch image from the backend
                        alt={bid.productName}
                        className="card-img-top"
                        style={{ height: "200px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.src = "/fallback.jpg"; // Fallback image if the fetch fails
                        }}
                      />
                    </div>

                    {/* Bid Details */}
                    <div className="card-body">
                      <h5 className="card-title">{bid.productName}</h5>
                      <p className="card-text">Bid Amount: ₹ {bid.amount}</p>
                      <p className="card-text">Seller: {bid.seller}</p>
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

export default MyProducts;
