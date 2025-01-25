import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap-icons/font/bootstrap-icons.css"; // Import Bootstrap Icons CSS
import "./ListAllAuctions.css"; // Import custom CSS for additional styling

const ListAllAuctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchAuctions();
  }, []);

  const fetchAuctions = async () => {
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(
        "http://localhost:8081/auction/bid/getall",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("API Response:", response.data); // Log the response
      setAuctions(response.data);
    } catch (error) {
      console.error("Error fetching auctions:", error);
      alert("Failed to fetch auctions. Please try again.");
    } finally {
      setLoading(false);
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

  const filteredAuctions = auctions.filter((auction) =>
    auction.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAuctions = filteredAuctions.sort((a, b) => {
    if (sortOrder === "asc") {
      return a[sortField] > b[sortField] ? 1 : -1;
    } else {
      return a[sortField] < b[sortField] ? 1 : -1;
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="list-auctions-container">
      <h1 className="list-auctions-title">HISTORY OF AUCTION</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-search"></i> {/* Bootstrap Search Icon */}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Auctions Table */}
      <div className="table-responsive">
        <table className="auctions-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("id")}>
                <i className="bi bi-list-ol me-2"></i>{" "}
                {/* Bootstrap List Icon */}
                ID{" "}
                {sortField === "id" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("userName")}>
                <i className="bi bi-person me-2"></i>{" "}
                {/* Bootstrap Person Icon */}
                User{" "}
                {sortField === "userName" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("productName")}>
                <i className="bi bi-box me-2"></i> {/* Bootstrap Box Icon */}
                Product{" "}
                {sortField === "productName" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("amount")}>
                <i class="bi bi-currency-rupee me-2"></i>{" "}
                {/* Bootstrap Dollar Icon */}
                Bid Amount{" "}
                {sortField === "amount" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
              <th onClick={() => handleSort("seller")}>
                <i className="bi bi-person-check me-2"></i>{" "}
                {/* Bootstrap Person Check Icon */}
                Seller{" "}
                {sortField === "seller" && (
                  <i
                    className={`bi bi-sort-${
                      sortOrder === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}{" "}
                {/* Sort Icon */}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedAuctions.length > 0 ? (
              sortedAuctions.map((auction) => (
                <tr key={auction.id}>
                  <td>{auction.id}</td>
                  <td>{auction.userName}</td>
                  <td>{auction.productName}</td>
                  <td>₹{auction.amount}</td>
                  <td>{auction.seller}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">
                  No auctions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListAllAuctions;
