import React, { useState } from "react";
import axios from "axios";

const PlaceBid = () => {
  const [productId, setProductId] = useState("");
  const [bidAmount, setBidAmount] = useState(0);

  const userId = localStorage.getItem("userId");

  const placeBid = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    const auction = { amount: bidAmount, status: true };

    try {
      await axios.post(
        `http://localhost:8081/auction/bid/${userId}/${productId}`,
        auction,
        {
          auth: { username, password },
        }
      );
      alert("Bid placed successfully!");
    } catch (error) {
      console.error("Error placing bid:", error);
    }
  };

  return (
    <div>
      <h1>Place Bid</h1>
      <input
        type="text"
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Bid Amount"
        value={bidAmount}
        onChange={(e) => setBidAmount(e.target.value)}
      />
      <button onClick={placeBid}>Place Bid</button>
    </div>
  );
};

export default PlaceBid;
