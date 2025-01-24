import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./AddWalletAmount.css"; // Custom CSS for AddWalletAmount

const AddWalletAmount = () => {
  const [amount, setAmount] = useState(0);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const addFunds = async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");

    try {
      await axios.put(
        `http://localhost:8081/auction/user/addAmount/${userId}/${amount}`,
        {},
        {
          auth: { username, password },
        }
      );
      toast.success("Amount added successfully!"); // Show success toast
      navigate("/User/UserProfile"); // Redirect to user profile
    } catch (error) {
      console.error("Error adding funds:", error);
      toast.error("Failed to add funds. Please try again."); // Show error toast
    }
  };

  return (
    <div className="add-wallet-container">
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
      <h1 className="add-wallet-title">Add Wallet Amount</h1>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="wallet-input"
      />
      <button onClick={addFunds} className="add-funds-button">
        Add Amount
      </button>
    </div>
  );
};

export default AddWalletAmount;
