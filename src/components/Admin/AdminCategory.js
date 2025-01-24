import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS
import "./AdminCategory.css"; // Custom CSS for AdminCategory

const AdminCategory = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation dialog
  const [categoryToDelete, setCategoryToDelete] = useState(null); // State to store the category to delete

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    try {
      const response = await axios.get(
        "http://localhost:8081/auction/category/getAllCategory",
        {
          auth: { username, password },
        }
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories. Please try again.", {
        className: "toastify-text-only", // Apply custom class
      });
    }
  };

  const deleteCategory = async (categoryId) => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    try {
      await axios.delete(
        `http://localhost:8081/auction/category/delete/${categoryId}`,
        {
          auth: { username, password },
        }
      );
      toast.success("Category deleted successfully!", {
        className: "toastify-text-only", // Apply custom class
      });
      fetchCategories(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting category:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errorMessage = error.response.data.errors[0]; // Get the first error message
        toast.error(errorMessage, {
          className: "toastify-text-only", // Apply custom class
        });
      } else {
        toast.error("An unexpected error occurred. Please try again.", {
          className: "toastify-text-only", // Apply custom class
        });
      }
    }
  };

  const handleDeleteClick = (categoryId) => {
    setCategoryToDelete(categoryId); // Set the category ID to delete
    setShowConfirmation(true); // Show the confirmation dialog
  };

  const handleConfirmDelete = () => {
    if (categoryToDelete) {
      deleteCategory(categoryToDelete); // Proceed with deletion
    }
    setShowConfirmation(false); // Close the confirmation dialog
    setCategoryToDelete(null); // Reset the category to delete
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false); // Close the confirmation dialog
    setCategoryToDelete(null); // Reset the category to delete
  };

  const addCategory = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const category = { id: newCategoryId, categoryName: newCategoryName };

    try {
      await axios.post(
        "http://localhost:8081/auction/category/addNewCategory",
        category,
        {
          auth: { username, password },
        }
      );
      toast.success("Category added successfully!", {
        className: "toastify-text-only", // Apply custom class
      });
      setShowAddForm(false); // Hide the add form
      setNewCategoryName(""); // Clear the input fields
      setNewCategoryId(""); // Clear the input fields
      fetchCategories(); // Refresh the list after adding
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.", {
        className: "toastify-text-only", // Apply custom class
      });
    }
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

  const filteredCategories = categories.filter((category) =>
    category.categoryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedCategories = filteredCategories.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  return (
    <div className="admin-category-container">
      {/* Toastify Container */}
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

      <h1 className="admin-category-title">CATEGORIES LIST</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by category name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Add Category Button */}
      <div className="add-category-button">
        <button
          className="btn btn-primary"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <i className="bi bi-plus me-2"></i> {/* Bootstrap Plus Icon */}
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showAddForm && (
        <div className="add-category-form">
          <h3>Add New Category</h3>
          <div className="form-group">
            <label htmlFor="categoryId" className="form-label">
              Category ID:
            </label>
            <input
              type="number"
              className="form-control"
              id="categoryId"
              placeholder="Enter Category ID"
              value={newCategoryId}
              onChange={(e) => setNewCategoryId(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryName" className="form-label">
              Category Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="categoryName"
              placeholder="Enter Category Name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <button className="btn btn-success" onClick={addCategory}>
            <i className="bi bi-check me-2"></i> {/* Bootstrap Check Icon */}
            Add
          </button>
        </div>
      )}

      {/* Categories Table */}
      <div className="table-responsive">
        <table className="categories-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                <i className="bi bi-list-ol me-2"></i>{" "}
                {/* Bootstrap List Icon */}
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
              <th onClick={() => handleSort("categoryName")}>
                <i className="bi bi-tag me-2"></i> {/* Bootstrap Tag Icon */}
                Category Name{" "}
                {sortField === "categoryName" && (
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
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.categoryName}</td>
                  <td>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteClick(category.id)}
                    >
                      <i className="bi bi-trash me-1"></i>{" "}
                      {/* Bootstrap Trash Icon */}
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation && (
        <div className="confirmation-dialog">
          <div className="confirmation-content">
            <p>Are you sure you want to delete this category?</p>
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

export default AdminCategory;
