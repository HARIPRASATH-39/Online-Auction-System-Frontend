import React from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "../css/AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="container-fluid p-0">
      {/* Sidebar and Main Content */}
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-2 custom-sidebar bg-dark text-white min-vh-100 p-3">
          <h3 className="text-center mb-4">Admin Panel</h3>
          <ul className="nav flex-column">
            <li className="nav-item mb-3">
              <Link to="/User/UserProfile" className="nav-link text-white">
                <i className="bi bi-person-circle me-2"></i>
                Profile
              </Link>
            </li>
            <li className="nav-item mb-3">
              <Link to="/Admin/AddAdmin" className="nav-link text-white">
                <i class="bi bi-person-add me-2"></i>
                Add Admin
              </Link>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-md-10 p-4">
          <h3 className="welcome mb-4 text-white">
            Welcome {localStorage.getItem("username")}
          </h3>

          <div className="row">
            {/* User Management Section */}
            <div className="col-md-4 mb-4">
              <Link to="/Admin/ListAllUsers" className="text-decoration-none">
                <div className="card h-100 shadow-sm custom-card hover-effect">
                  <div className="card-body text-center">
                    <i className="bi bi-people-fill display-4 mb-3 text-orange"></i>{" "}
                    {/* User Icon */}
                    <h5 className="card-title text-black">User Management</h5>
                  </div>
                </div>
              </Link>
            </div>

            {/* Category Management Section */}
            <div className="col-md-4 mb-4">
              <Link to="/Admin/AdminCategory" className="text-decoration-none">
                <div className="card h-100 shadow-sm custom-card hover-effect">
                  <div className="card-body text-center">
                    <i className="bi bi-tags-fill display-4 mb-3 text-orange"></i>{" "}
                    {/* Category Icon */}
                    <h5 className="card-title text-black">
                      Category Management
                    </h5>
                  </div>
                </div>
              </Link>
            </div>

            {/* Auction Management Section */}
            <div className="col-md-4 mb-4">
              <Link
                to="/Admin/ListAllAuctions"
                className="text-decoration-none"
              >
                <div className="card h-100 shadow-sm custom-card hover-effect">
                  <div className="card-body text-center">
                    <i className="bi bi-gem display-4 mb-3 text-orange"></i>{" "}
                    {/* Auction Icon */}
                    <h5 className="card-title text-black">
                      Auction Management
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
