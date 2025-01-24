import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./AuctionPlatform.css"; // Custom CSS for AuctionPlatform

const AuctionPlatform = () => {
  const { productId } = useParams(); // Get productId from URL
  const [product, setProduct] = useState(null);
  const [currentBid, setCurrentBid] = useState(0);
  const [bidAmount, setBidAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(90);
  const [isAuctionActive, setIsAuctionActive] = useState(true);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const password = localStorage.getItem("password");

  // Fetch product and auction details
  useEffect(() => {
    const fetchAuctionDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/auction/product/find/${productId}`
        );
        setProduct(response.data);
        setCurrentBid(response.data.highest_bid || response.data.price); // Initialize current bid

        // Check if the auction has already started
        const auctionStartTime = localStorage.getItem(
          `auctionStartTime_${productId}`
        );
        if (auctionStartTime) {
          const elapsedTime = Math.floor(
            (Date.now() - parseInt(auctionStartTime)) / 1000
          );
          const remainingTime = Math.max(0, 90 - elapsedTime);
          setTimer(remainingTime);

          if (remainingTime > 0) {
            startTimer(remainingTime);
          } else {
            setIsAuctionActive(false);
          }
        }
      } catch (error) {
        console.error("Error fetching auction details:", error);
        toast.error("Failed to fetch auction details. Please try again later.");
      }
    };

    fetchAuctionDetails();
  }, [productId]);

  // Handle bid submission
  const handlePlaceBid = async (e) => {
    e.preventDefault();

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      toast.error("Please enter a valid bid amount.");
      return;
    }

    if (parseFloat(bidAmount) <= currentBid) {
      toast.error(`Bid must be greater than the current bid: ${currentBid}`);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8081/auction/bid/${userId}/${productId}`,
        { amount: parseFloat(bidAmount) },
        {
          auth: { username, password },
        }
      );

      // Update current bid
      setCurrentBid(parseFloat(bidAmount));

      // Start timer if it's the first bid
      if (currentBid === product.price) {
        localStorage.setItem(
          `auctionStartTime_${productId}`,
          Date.now().toString()
        );
        startTimer(90);
      }

      toast.success(response.data); // Show success message
    } catch (error) {
      console.error("Error placing bid:", error);
      toast.error(
        error.response.data.errors[0] ||
          "Failed to place bid. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (productId) => {
    return `http://localhost:8081/auction/product/image/${productId}`;
  };

  // Start the countdown timer
  const startTimer = (initialTime) => {
    setTimer(initialTime);
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          setIsAuctionActive(false);
          toast.info("Auction has ended!");

          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);
  };

  if (!product) {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  return (
    <div className="auction-platform-container">
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

      {/* Visual Countdown Timer with Progress Bar */}
      <div className="countdown-timer">
        <h2 className="timer-text">
          Time Remaining: <span className="timer-value">{timer}</span> seconds
        </h2>
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{ width: `${(timer / 90) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Auction Card */}
      <div className="auction-card">
        <h3 className="auction-title">Product Details</h3>
        <div className="product-details">
          <div>
            <p>
              <strong>Product Name:</strong> {product.productName}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Seller:</strong> {product.userName}
            </p>
            <p>
              <strong>Current Highest Bid:</strong> ₹ {currentBid}
            </p>
            <p>
              <strong>Starting Price:</strong> ₹ {product.price}
            </p>
          </div>
          <img
            className="product-image"
            src={getImageUrl(product.productId)}
          ></img>
        </div>

        {isAuctionActive ? (
          <form onSubmit={handlePlaceBid} className="bid-form">
            <div className="form-group">
              <label htmlFor="bidAmount" className="form-label">
                Enter Your Bid:
              </label>
              <input
                type="number"
                id="bidAmount"
                value={bidAmount}
                onChange={(e) => setBidAmount(e.target.value)}
                className="bid-input"
                required
              />
            </div>
            <button type="submit" className="bid-button" disabled={loading}>
              {loading ? "Placing Bid..." : "Place Bid"}
            </button>
          </form>
        ) : (
          <div className="auction-ended-message">
            The auction has ended. The product is sold.
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionPlatform;
