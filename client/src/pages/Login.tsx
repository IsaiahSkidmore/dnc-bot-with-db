import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import React from "react";


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "Login successful!") {
      const userProfile = authService.getProfile(); // Get the user profile from authService
      if (userProfile) {
        navigate(`/agent`); // Redirect to the home page
      }
    }
  };

  // Validation and form submission
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate if all fields are filled
    if (!email || !password) {
      setModalMessage("All fields are required!");
      setShowModal(true);
      return;
    }

    // Proceed with login if all validations pass
    try {
      const result = await authService.login(email, password); // Call the login method from authService

      if (result) {
        // localStorage.setItem("token", result);
        setModalMessage("Login successful!");
        setShowModal(true);
        navigate(`/agent`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      
      if ((error as any).response && (error as any).response.status === 404) {
        setModalMessage("User not found.");
      } else {
        setModalMessage("An error occurred during login.");
      }
      setShowModal(true);
    }
  };

  return (
    <div>
      
          <p className="authP">
            Login to your account to acces the phone dialer.
          </p>

          <div className="loginContainer">
            <div className="login">
            <form onSubmit={handleLogin}>
            <h2>
                Login
              </h2>
            <div className="container">
    
            <input
              type="email"
              className="loginInput"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            
            <div className="container">
            <input
              type="password"
              className="loginInput"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>

            <p style={{marginTop: '10px'}}>
              Don't have an account?{" "}
              <Link to="/register" style={{textDecoration: 'none'}}>
                <span>Register</span>
              </Link> 
            </p>

            <div className="container">
            <button id="loginButton">
             <span>Login</span>
            </button>
            </div>
            

          </form>
            </div>
          </div>

      </div>
  );
};

export default Login;
