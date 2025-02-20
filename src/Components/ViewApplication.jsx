import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
import axios from "axios";

const AdminViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/auth/request/fetch"
      );
      setApplications(response.data); 
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    }
  };

  const handleStatusChange = async (loanId, status) => {
    try {
      await axios.put("http://localhost:8080/auth/request/status", {
        loanId,
        status,
      });
      setApplications((prev) =>
        prev.map((app) => (app._id === loanId ? { ...app, status } : app))
      );
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Loan Applications</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Applicant</th>
            <th>Applicant ID</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Interest Rate</th>
            <th>Months</th>
            <th>Total Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app._id}>
              <td>{index + 1}</td>
              <td>{app.userName}</td>
              <td>{app.userId}</td>
              <td>{app.loanCategory}</td>
              <td>${app.amount}</td>
              <td>{app.interestRate}%</td>
              <td>{app.months}</td>
              <td>${app.duePayment}</td>
              <td
                className={
                  app.duePayment <= 0
                    ? "text-success"
                    : app.status === "approved"
                    ? "text-success"
                    : app.status === "rejected"
                    ? "text-danger"
                    : "text-warning"
                }
              >
                {app.duePayment <= 0 ? "Paid" : app.status.charAt(0).toUpperCase() + app.status.slice(1)}
              </td>
              <td>
                {app.status?.trim().toLowerCase() === "pending" && app.duePayment > 0 && (
                  <>
                    <Button
                      variant="success"
                      className="me-2"
                      onClick={() => handleStatusChange(app._id, "approved")}
                    >
                      <BsCheckCircle /> Approve
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleStatusChange(app._id, "rejected")}
                    >
                      <BsXCircle /> Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
  
};

export default AdminViewApplications;
