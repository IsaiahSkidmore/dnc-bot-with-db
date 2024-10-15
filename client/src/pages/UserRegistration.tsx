import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
    if (modalMessage === "User registered successfully!") {
      const userProfile = authService.getProfile();
      if (userProfile) {
        navigate(`/agent`);
        console.log(process.env.JWT_SECRET);
      }
    }
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setModalMessage("All fields are required!");
      setShowModal(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setModalMessage("Please enter a valid email address.");
      setShowModal(true);
      return;
    }

    if (password.length < 6) {
      setModalMessage("Password must be at least 6 characters long.");
      setShowModal(true);
      return;
    }

    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }

    try {
      const result = await authService.register({ name, email, password });

      if (result.token) {
        localStorage.setItem("jwtToken", result.token);
        setModalMessage("User registered successfully!");
        setShowModal(true);
      } else {
        setModalMessage(
          result.message || "An error occurred during registration.",
        );
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setModalMessage("An error occurred during registration.");
      setShowModal(true);
    }
  };

  return (
    <div>
      <Link
        to="/"
      >
        <span id="backToHome">&#x25c0;</span>
        
      </Link>

      <div>
        <div>
          <h2>Sign Up</h2>
          <p className="authP">
            Create an account to start using the dialer.
          </p>

          <form onSubmit={handleSignup}>
            <div className="container">
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            </div>
            <div className="container">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
            <div className="container">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
            <div className="container">
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            </div>
            <div className="container">
            <button
              type="submit"
              id="loginButton"
            >
              <span>Sign Up</span>
            </button>
            </div>
          </form>

          {showModal && (
            <div>
              <div>
                <h3>
                  Registration Status
                </h3>
                <p>{modalMessage}</p>
                <button
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;
