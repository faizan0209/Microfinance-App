import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDollarSign,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaClipboardList,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">Admin Dashboard</h2>
      <div className="row">
        {/* Users Card */}
        <div className="col-md-4">
          <div className="card shadow-lg p-3 text-center">
            <FaUsers className="text-primary" size={50} />
            <h4 className="mt-3">Registered Users</h4>
            <p>Manage and view all registered users.</p>
            <Link to= "/users" className="btn btn-primary w-100">
              View Users
            </Link>
          </div>
        </div>

        {/* Loan Applications Card */}
        <div className="col-md-4">
          <div className="card shadow-lg p-3 text-center">
            <FaClipboardList className="text-success" size={50} />
            <h4 className="mt-3">Loan Applications</h4>
            <p>View and manage pending loan applications.</p>
            <Link to = "/viewApplication" className="btn btn-success w-100">
              View Applications
            </Link>
          </div>
        </div>

        {/* Logout Card */}
        <div className="col-md-4">
          <div className="card shadow-lg p-3 text-center">
            <FaSignOutAlt className="text-danger" size={50} />
            <h4 className="mt-3">Logout</h4>
            <p>Logout securely from your account.</p>
            <button className="btn btn-danger w-100" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
        <div className="col-md-4 py-3">
          <div className="card shadow-lg p-3 text-center">
            <FaDollarSign className="text-warning" size={50} />
            <h4 className="mt-3">Loan Categories</h4>
            <p>View and manage different loan categories available.</p>
            <Link to="/loanList" className="btn btn-warning w-100">
              View Categories
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
