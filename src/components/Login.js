import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/Login.css";

function Login({ setLoggedIn, setUserRole }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8081/auction/user/login",
        {
          username,
          password,
        }
      );

      // Store user data in local storage
      sessionStorage.setItem("username", response.data.username);
      sessionStorage.setItem("token", response.data.token);
      sessionStorage.setItem("loggedIn", true);
      sessionStorage.setItem("userRole", response.data.roles);
      sessionStorage.setItem("userId", response.data.id);

      // Update loggedIn and userRole state
      setLoggedIn(true);
      setUserRole(response.data.roles);

      // Redirect to home page after successful login
      navigate("/");
    } catch (error) {
      setError("Invalid username or password");
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        <p className="signup-link">
          Don't have an account?{" "}
          <Link to="/signup" className="signup-text">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
