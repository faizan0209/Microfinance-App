import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "react-bootstrap";
import axios from "axios";
import { BsTrash, BsArrowUpCircle } from "react-icons/bs";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/users");
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (userId, role) => {
    if (role === "admin") {
      alert("Admins cannot be deleted!");
      return;
    }
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
        await axios.delete(`http://localhost:8080/auth/deleteUser/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
};
  const handlePromote = async (userId) => {
    try {
        await axios.put(`http://localhost:8080/auth/updateUser/${userId}`, {
            role: "admin",
          });          
      setUsers(users.map((user) =>
        user._id === userId ? { ...user, role: "admin" } : user
      ));
    } catch (error) {
      console.error("Error promoting user:", error);
    }
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Manage Users</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className={user.role === "admin" ? "text-primary" : "text-secondary"}>
                {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
              </td>
              <td>
                {user.role === "user" && (
                  <Button
                    variant="warning"
                    className="me-2"
                    onClick={() => handlePromote(user._id)}
                  >
                    <BsArrowUpCircle /> Promote
                  </Button>
                )}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(user._id)}
                >
                  <BsTrash /> Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ManageUsers;
