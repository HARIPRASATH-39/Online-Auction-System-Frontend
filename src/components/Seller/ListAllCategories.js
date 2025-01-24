import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons
import "./ListAllCategories.css"; // Custom CSS for ListAllCategories

const ListAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

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
      alert("Failed to fetch categories. Please try again.");
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
    <div className="list-categories-container">
      <h1 className="list-categories-title">CATEGORIES</h1>

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
            </tr>
          </thead>
          <tbody>
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.categoryName}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAllCategories;
