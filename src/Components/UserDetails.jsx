import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { FaUpload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import axios from "axios";

const DocumentUpload = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    cnic: "",
    userType: "Employee",
  });

  const [documents, setDocuments] = useState({
    salarySlip: null,
    cnicDocument: null,
    bankStatement: null,
    studentId: null,
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setError("Please log in first.");
    }
  }, []);

//   const fetchUserData = async (token) => {
//     try {
//       const response = await axios.get("http://localhost:8080/auth/user", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserData(response.data);
//     } catch (err) {
//       setError("Failed to fetch user data.");
//     }
//   };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Unauthorized: Please log in first.");
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("cnic", userData.cnic);
      formData.append("userType", userData.userType);

      Object.keys(documents).forEach((key) => {
        if (documents[key]) formData.append(key, documents[key]);
      });

      const response = await axios.post("http://localhost:8080/uploadDocs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Error uploading documents");
    }
    setLoading(false);
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">Upload Required Documents</h2>
      {message && <Alert variant="success"><FaCheckCircle /> {message}</Alert>}
      {error && <Alert variant="danger"><FaTimesCircle /> {error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" name="name" value={userData.name} onChange={handleChange} required disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" value={userData.email} onChange={handleChange} required disabled />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>CNIC</Form.Label>
              <Form.Control type="text" name="cnic" value={userData.cnic} onChange={handleChange} required disabled />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>User Type</Form.Label>
              <Form.Control type="text" name="userType" value={userData.userType} required disabled />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Salary Slip (if Employee)</Form.Label>
              <Form.Control type="file" name="salarySlip" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>CNIC Document</Form.Label>
              <Form.Control type="file" name="cnicDocument" onChange={handleFileChange} accept=".pdf,.jpg,.png" required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Bank Statement (if Employee)</Form.Label>
              <Form.Control type="file" name="bankStatement" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Student ID Card (if Student)</Form.Label>
              <Form.Control type="file" name="studentId" onChange={handleFileChange} accept=".pdf,.jpg,.png" />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={loading}>
          <FaUpload /> {loading ? "Uploading..." : "Submit Documents"}
        </Button>
      </Form>
    </Container>
  );
};

export default DocumentUpload;
