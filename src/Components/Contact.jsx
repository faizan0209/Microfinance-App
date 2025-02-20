import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setMessage("All fields are required!");
      setMessageType("danger");
      return;
    }
    setMessage("Message sent successfully!");
    setMessageType("success");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg p-4">
        {/* Header Section */}
        <h2 className="text-center text-primary mb-4">Contact Us</h2>
        <p className="text-muted text-center">
          Have any questions? Get in touch with us.
        </p>

        {/* Alert Message */}
        {message && (
          <div className={`alert alert-${messageType} text-center`}>{message}</div>
        )}

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-3">
            <label className="form-label">Your Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Your Message</label>
            <textarea
              className="form-control"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="4"
              placeholder="Type your message here..."
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Send Message
          </button>
        </form>

        {/* Contact Info */}
        <div className="mt-4 text-center">
          <h5 className="text-dark">Our Contact Details</h5>
          <p className="text-muted">
            📧 Email: faizansajid42@yahoo.com <br />
            📞 Phone: +92-3130240769 <br />
            📍 Address: 123 Microfinance Street, Karachi, Pakistan
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
