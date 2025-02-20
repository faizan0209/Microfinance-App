import React from "react";

const About = () => {
  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        <h2 className="text-center text-primary mb-4">About Microfinance App</h2>
        <p className="text-muted text-center">
          Empowering individuals with financial support through easy and accessible loans.
        </p>
        <div className="mt-4">
          <h4 className="text-dark">Loan Application Rules</h4>
          <ul className="list-group mt-3">
            <li className="list-group-item">
              <strong>📌 Minimum Loan Amount:</strong> 10,000 PKR
            </li>
            <li className="list-group-item">
              <strong>⏳ Minimum Loan Duration:</strong> 5 Months
            </li>
            <li className="list-group-item">
              <strong>⏳ Maximum Loan Duration:</strong> 24 Months
            </li>
            <li className="list-group-item">
              <strong>💵 Minimum Payment:</strong> 1,000 PKR
            </li>
          </ul>
        </div>

        <div className="mt-4 text-center">
          <h5 className="text-dark">Have Questions? Contact Us!</h5>
          <p className="text-muted">Email: faizansajid42@yahoo.com | Phone: +923130240769</p>
        </div>
      </div>
    </div>
  );
};

export default About;
