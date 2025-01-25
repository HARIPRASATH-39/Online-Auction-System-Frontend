import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import UserDashboard from "./components/UserDashboard";
import SellerDashboard from "./components/SellerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import AddAdmin from "./components/Admin/AddAdmin.js";
import MyProducts from "./components/User/MyProducts.js";
import ListAllAuctions from "./components/Admin/ListAllAuctions";
import ListAllUsers from "./components/Admin/ListAllUsers";
import AddProduct from "./components/Seller/AddProduct";
import ListAllCategories from "./components/Seller/ListAllCategories";
import AddWalletAmount from "./components/User/AddWalletAmount";
import ListAllProducts from "./components/User/ListAllProducts";
import PlaceBid from "./components/User/PlaceBid";
import UserProfile from "./components/User/UserProfile";
import ProductDetails from "./components/Seller/ProductDetails.js";
import AuctionPlatform from "./components/User/AuctionPlatform.js";
import "./App.css";
import AdminCategory from "./components/Admin/AdminCategory.js";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    sessionStorage.getItem("loggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(sessionStorage.getItem("userRole"));

  useEffect(() => {
    sessionStorage.setItem("loggedIn", loggedIn);
    sessionStorage.setItem("userRole", userRole);
  }, [loggedIn, userRole]);

  return (
    <div>
      <Navbar loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <div className="background">
        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              loggedIn ? (
                userRole === "ADMIN" ? (
                  <AdminDashboard />
                ) : userRole === "SELLER" ? (
                  <SellerDashboard />
                ) : (
                  <UserDashboard />
                )
              ) : (
                <Home />
              )
            }
          />

          {/* Login Page */}
          <Route
            path="/login"
            element={
              <Login setLoggedIn={setLoggedIn} setUserRole={setUserRole} />
            }
          />

          {/* Signup Page */}
          <Route path="/signup" element={<Signup />} />

          {/* Admin Routes */}
          <Route path="/Admin/ListAllUsers" element={<ListAllUsers />} />
          <Route path="/Admin/ListAllAuctions" element={<ListAllAuctions />} />
          <Route path="/Admin/AdminCategory" element={<AdminCategory />} />
          <Route path="/Admin/AddAdmin" element={<AddAdmin />} />

          {/* User Routes */}
          <Route path="/User/UserProfile" element={<UserProfile />} />
          <Route path="/User/AddWalletAmount" element={<AddWalletAmount />} />
          <Route path="/User/ListAllProducts" element={<ListAllProducts />} />
          <Route path="/User/PlaceBid" element={<PlaceBid />} />
          <Route path="/User/MyProducts" element={<MyProducts />} />

          <Route
            path="/User/AuctionPlatform/:productId"
            element={<AuctionPlatform />}
          />

          {/* Seller Routes */}
          <Route path="/Seller/AddProduct" element={<AddProduct />} />
          <Route
            path="/Seller/ListAllCategories"
            element={<ListAllCategories />}
          />
          <Route
            path="/Seller/ProductDetails/:productId"
            element={<ProductDetails />}
          />
        </Routes>
      </div>
      <footer className="footer-section text-center py-4 text-white">
        <div className="container">
          <p className="mb-0">
            &copy; 2025 AuctionSphere. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
