import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDollarSign, FaList, FaPercentage, FaCalendar } from "react-icons/fa";

const LoanForm = () => {
  const [amount, setAmount] = useState("");
  const [loanCategory, setLoanCategory] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [months, setMonths] = useState("");
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/category");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setLoanCategory(selectedCategory);

    const category = categories.find((cat) => cat.name === selectedCategory);
    if (category) {
      setInterestRate(category.interestRate); 
    }
  };

  const applyLoan = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/auth/request",
        { amount, loanCategory, interestRate, months },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Loan request submitted successfully!");
      setMessageType("success")
      setAmount("")
      setLoanCategory('')
      setInterestRate('')
      setMonths('')
    } catch (error) {
      setMessage(error.response?.data?.message || "Error applying for loan!");
      setMessageType("danger");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow-lg p-4 w-50">
        <h2 className="text-center text-primary mb-4">Apply for Loan</h2>
        {message && (
          <div className={`alert alert-${messageType} text-center`}>{message}</div>
        )}
        <form onSubmit={applyLoan}>
          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaDollarSign /></span>
            <input
              type="number"
              className="form-control"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaList /></span>
            <select
              className="form-control"
              value={loanCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Loan Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaPercentage /></span>
            <input
              type="number"
              className="form-control"
              placeholder="Interest Rate (%)"
              value={interestRate}
              readOnly 
            />
          </div>

          <div className="mb-3 input-group">
            <span className="input-group-text bg-primary text-white"><FaCalendar /></span>
            <input
              type="number"
              className="form-control"
              placeholder="Months"
              value={months}
              onChange={(e) => setMonths(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Apply Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoanForm;
