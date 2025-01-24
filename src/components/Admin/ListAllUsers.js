import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./ListAllUsers.css"; // Custom CSS for ListAllUsers
import { toast, ToastContainer } from "react-toastify";

const ListAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const [userToDelete, setUserToDelete] = useState(null); // State to store the user to delete

  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/auction/user/listAllUsers",
        {
          auth: { username, password },
        }
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:8081/auction/user/delete/${userId}`,
        {
          auth: { username, password },
        }
      );
      toast.success("User Deleted Successfully");
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleDeleteClick = (userId) => {
    setUserToDelete(userId); // Set the user ID to delete
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      deleteUser(userToDelete); // Proceed with deletion
    }
    setShowConfirmation(false); // Close the confirmation dialog
    setUserToDelete(null); // Reset the user to delete
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    setUserToDelete(null); // Reset the user to delete
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.roles.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <div className="list-users-container">
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
      <h1 className="list-users-title">USERS LIST</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by username, email, or role"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="table-responsive">
        <table className="users-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                <i className="bi bi-person-badge me-2"></i>{" "}
                {/* Bootstrap ID Icon */}
                ID{" "}
                {sortField === "id" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "down" : "up"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("username")}>
                <i className="bi bi-person me-2"></i>{" "}
                {/* Bootstrap User Icon */}
                Username{" "}
                {sortField === "username" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "down" : "up"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("email")}>
                <i className="bi bi-envelope me-2"></i>{" "}
                {/* Bootstrap Email Icon */}
                Email{" "}
                {sortField === "email" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "down" : "up"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("roles")}>
                <i className="bi bi-key me-2"></i> {/* Bootstrap Key Icon */}
                Role{" "}
                {sortField === "roles" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "down" : "up"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.roles}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteClick(user.id)}
                  >
                    <i className="bi bi-trash me-1"></i>{" "}
                    {/* Bootstrap Trash Icon */}
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this user?</p>
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

export default ListAllUsers;
