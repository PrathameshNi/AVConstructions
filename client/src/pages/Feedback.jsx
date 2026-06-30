import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style2.css";

const Feedback = () => {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    feedback: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://avconstructions.onrender.com/api/feedback",
        form
      );

      alert("Feedback Submitted Successfully ✅");

      setForm({
        name: "",
        email: "",
        rating: 5,
        feedback: "",
      });

    } catch (err) {

      alert("Something went wrong");

    }
  };

  return (

    <div className="appointment-page">

      <div className="appointment-card">

        <h1>Customer Feedback</h1>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
          >
            <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
            <option value="4">⭐⭐⭐⭐ Very Good</option>
            <option value="3">⭐⭐⭐ Good</option>
            <option value="2">⭐⭐ Fair</option>
            <option value="1">⭐ Poor</option>
          </select>

          <textarea
            name="feedback"
            placeholder="Write your feedback..."
            value={form.feedback}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Submit Feedback
          </button>

        </form>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>

      </div>

    </div>

  );
};

export default Feedback;