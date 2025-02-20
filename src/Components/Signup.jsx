import React, { useState } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        name,
        email,
        password,
      });

      setMessage("Signup successful! Redirecting to login...");
      setMessageType("success");
      setTimeout(() => {
        window.location.href = "/"; 
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed!");
      setMessageType("danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">Sign Up</h2>
        {message && (
          <div className={`alert alert-${messageType} text-center`}>{message}</div>
        )}
        <form onSubmit={handleSignup}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaUser /></span>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaEnvelope /></span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaLock /></span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to= "/" className="text-primary">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;