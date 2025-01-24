import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../css/Signup.css"; // Import the CSS file for styling
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roles: "USER", // Default role
    wallet_amount: 0, // Wallet amount field
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/auction/user/signup",
        formData
      );

      toast.success(response.data); // Success message
      navigate("/login"); // Redirect to login page
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Extract the first error message
        const errorMessage = error.response.data.errors[0];
        setError(errorMessage); // Set the error state
        toast.error(errorMessage); // Display the error message using toast
      } else {
        setError("Signup failed. Please try again."); // Generic error message
        toast.error("Signup failed. Please try again."); // Display generic error
      }
    }
  };

  return (
    <div className="signup-container">
      <ToastContainer
        position="top-center"
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
      <div className="signup-box">
        <h2 className="signup-title">Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="signup-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="signup-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="signup-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="walletAmount" className="form-label">
              Wallet Amount
            </label>
            <input
              type="number"
              id="walletAmount"
              placeholder="Enter wallet amount"
              value={formData.wallet_amount}
              onChange={(e) =>
                setFormData({ ...formData, wallet_amount: e.target.value })
              }
              className="signup-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select
              id="role"
              value={formData.roles}
              onChange={(e) =>
                setFormData({ ...formData, roles: e.target.value })
              }
              className="signup-input"
            >
              <option value="USER">User</option>
              {/* <option value="ADMIN">Admin</option> */}
              <option value="SELLER">Seller</option>
            </select>
          </div>

          <button type="submit" className="signup-button">
            Signup
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <Link to="/login" className="login-text">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
