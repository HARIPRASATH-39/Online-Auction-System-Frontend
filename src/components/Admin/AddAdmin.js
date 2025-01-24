import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./AddAdmin.css";

const AddAdmin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    roles: "ADMIN", // Default role for admin
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8081/auction/user/signup",
        formData
      );

      toast.success("Admin added successfully!"); // Success message
      setFormData({
        username: "",
        password: "",
        email: "",
        wallet_amount: 0,
        roles: "ADMIN",
      }); // Reset form
      navigate("/");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        // Extract the first error message
        const errorMessage = error.response.data.errors[0];
        setError(errorMessage); // Set the error state
        toast.error(errorMessage); // Display the error message using toast
      } else {
        setError("Failed to add admin. Please try again."); // Generic error message
        toast.error("Failed to add admin. Please try again."); // Display generic error
      }
    }
  };

  return (
    <div className="add-admin-container">
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
      <h2>Add Admin</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Admin
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
