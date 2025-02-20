import React, { useState, useEffect } from "react";
import { Table, Button, Spinner, Alert, Modal, Form } from "react-bootstrap";
import { FaMoneyBillWave } from "react-icons/fa";
import axios from "axios";

const LoanHistory = () => {
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [amountPaid, setAmountPaid] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchUserLoans();
  }, []);

  const fetchUserLoans = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/auth/userLoans", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLoans(response.data);
    } catch (err) {
      setError("Failed to fetch loans");
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    if (!selectedLoan || !amountPaid) {
      setError("Please enter an amount");
      return;
    }
  
    // ❌ Prevent payment if loan status is "Pending"
    if (selectedLoan.status === "Pending"|| selectedLoan.status === "rejected") {
      setError("Payment cannot be made while the loan is pending or rejected approval.");
      return;
    }
  
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/auth/pay",
        { loanId: selectedLoan._id, amountPaid: parseFloat(amountPaid) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setSuccess(response.data.message);
  
      // ✅ Update only the remaining amount in frontend state
      setLoans((prevLoans) =>
        prevLoans.map((loan) =>
          loan._id === selectedLoan._id
            ? { ...loan, remainingAmount: response.data.remainingAmount }
            : loan
        )
      );
  
      setAmountPaid("");
      setShowModal(false);
    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    }
    setLoading(false);
  };
  
  

  return (
    <div className="container mt-4">
      <h2 className="mb-3">User Loan History</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Loan Category</th>
              <th>Remaining Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan.loanCategory}</td>
                <td>${loan.duePayment}</td> {/* Show amount due */}
                <td>{loan.status}</td>
                <td>
                    <Button
                      variant="success"
                      onClick={() => { setSelectedLoan(loan); setShowModal(true); }}
                    >
                      <FaMoneyBillWave /> Make Payment
                    </Button>
                  {loan.duePayment <= 0 && <span className="text-success px-5">Paid</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Payment Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Make Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Due Amount: ${selectedLoan?.duePayment.toFixed(0)}</p>
          <Form.Group>
            <Form.Label>Enter Payment Amount</Form.Label>
            <Form.Control
              type="number"
              min="2000"
              max={selectedLoan?.duePayment}
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handlePayment}
            disabled={loading || amountPaid <= 0 || amountPaid > selectedLoan?.duePayment}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoanHistory;
