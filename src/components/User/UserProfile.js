import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UserProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  // Fetch user details
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auction/user/find/${userId}`,
          {
            auth: {
              username,
              password,
            },
          }
        );
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          password: "", // Password is not fetched for security reasons
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setError("Failed to fetch user details. Please try again later.");
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8081/auction/user/update/${userId}`,
        formData,
        {
          auth: {
            username,
            password,
          },
        }
      );
      setUser(response.data);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user details:", error);
      toast.error("Failed to update profile. Please try again later.");
    }
  };

  if (loading) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (!user) {
    toast.warning("User not found.");
    return null;
  }

  return (
    <div className="user-profile-container">
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
      <div className="user-profile-card">
        <h1 className="user-profile-title">User Profile</h1>
        <div className="user-profile-content">
          {/* User Information Section */}
          <div className="profile-section">
            <h3 className="section-title">User Information</h3>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Username:</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Enter new password"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn btn-secondary ml-2"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <div className="profile-detail">
                  <label>Username:</label>
                  <p>{user.username}</p>
                </div>
                <div className="profile-detail">
                  <label>Email:</label>
                  <p>{user.email}</p>
                </div>
                <div className="profile-detail">
                  <label>Wallet Balance:</label>
                  <p>₹ {user.wallet_amount}</p>
                </div>
                <button
                  className="btn btn-primary"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

          {/* Wallet Management Section */}
          <div className="profile-section">
            <Link to="/User/AddWalletAmount" className="wallet-button">
              Add Wallet Amount
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
