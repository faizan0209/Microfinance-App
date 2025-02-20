import React, { useState, useEffect } from "react";
import { Button, Form, Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const LoanCategoryForm = ({ addLoanCategory }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [loanCategories, setLoanCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null); 
  useEffect(() => {
    const fetchLoanCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/auth/category");
        setLoanCategories(response.data);
      } catch (error) {
        console.error("Error fetching loan categories:", error);
      }
    };

    fetchLoanCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !interestRate) {
      alert("All fields are required!");
      return;
    }

    const rate = parseFloat(interestRate);
    if (isNaN(rate)) {
      alert("Please enter a valid interest rate!");
      return;
    }

    setLoading(true);

    try {
      const newCategory = { name, description, interestRate: rate };

      if (editingCategoryId) {
        const response = await axios.put(
          `http://localhost:8080/auth/edit/${editingCategoryId}`,
          newCategory
        );

        setLoanCategories(loanCategories.map((category) =>
          category._id === editingCategoryId ? response.data.category : category
        ));

        alert("Loan category updated successfully!");
      } else {
        const response = await axios.post(
          "http://localhost:8080/auth/add",
          newCategory
        );

        addLoanCategory(response.data.category);
        setLoanCategories((prevCategories) => [...prevCategories, response.data.category]);

        alert("Loan category added successfully!");
      }

      setName("");
      setDescription("");
      setInterestRate("");
      setEditingCategoryId(null); 
    } catch (error) {
      console.error("Error submitting loan category:", error);
      alert("Error submitting loan category. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/auth/delete/${id}`);
      setLoanCategories(loanCategories.filter((category) => category._id !== id));
      alert("Loan category deleted successfully!");
    } catch (error) {
      console.error("Error deleting loan category:", error);
      alert("Error deleting loan category. Please try again.");
    }
  };

  const handleEdit = (category) => {
    setName(category.name);
    setDescription(category.description);
    setInterestRate(category.interestRate);
    setEditingCategoryId(category._id); 
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
       
        <Col md={5}>
          <h3>{editingCategoryId ? "Edit Loan Category" : "Add Loan Category"}</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Loan Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter loan name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formInterestRate">
              <Form.Label>Interest Rate (%)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter interest rate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
              {loading ? (editingCategoryId ? "Updating..." : "Adding...") : (editingCategoryId ? "Update Category" : "Add Category")}
            </Button>
          </Form>
        </Col>
        <Col md={5}>
          <h4 className="mt-4">Loan Categories</h4>
          <ListGroup className="mt-3">
            {loanCategories.map((category) => (
              <ListGroup.Item key={category._id} className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>{category.name}</strong> - {category.description} (Rate: {category.interestRate}%)
                </div>
                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    className="mx-2"
                    onClick={() => handleEdit(category)} 
                  >
                    <FaEdit /> Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    className="mx-2"
                    onClick={() => handleDelete(category._id)}
                  >
                    <FaTrash /> Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default LoanCategoryForm;
