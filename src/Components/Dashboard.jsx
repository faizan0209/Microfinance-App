import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoneyCheckAlt, FaHistory, FaSignOutAlt , FaUpload} from "react-icons/fa";

const UserDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center text-primary mb-4">User Dashboard</h2>

      <div className="row">
        {/* Apply for Loan Card */}
        <div className="col-md-4">
          <div className="card shadow-lg p-3 text-center">
            <FaMoneyCheckAlt className="text-primary" size={50} />
            <h4 className="mt-3">Apply for Loan</h4>
            <p>Get financial assistance with easy loan applications.</p>
            <Link to="/applyLoan" className="btn btn-primary w-100">
              Apply Now
            </Link>
          </div>
        </div>

        {/* Loan History Card */}
        <div className="col-md-4">
          <div className="card shadow-lg p-3 text-center">
            <FaHistory className="text-success" size={50} />
            <h4 className="mt-3">Loan History</h4>
            <p>Check the status and history of your loan applications.</p>
            <Link to="/payments" className="btn btn-success w-100">
              View History
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
        {/* <div className="col-md-4 py-3">
          <div className="card shadow-lg p-3 text-center">
            <FaUpload className="me-2 text-warning" size={50} />
            <h4 className="mt-3">User Documents Upload</h4>
            <p>Upload your documents securely</p>
            <Link to="/upload" className="btn btn-warning w-100">
              Loan Payments
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserDashboard;
