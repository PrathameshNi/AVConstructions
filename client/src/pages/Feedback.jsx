import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Style2.css";

const API_BASE = "https://avconstructions.onrender.com/api/feedback";

const Feedback = () => {
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    feedback: "",
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError("");

      // public route — no token needed
      const res = await axios.get(`${API_BASE}/public`);
      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
      setError("Unable to load feedback right now. Please try again later.");
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.feedback.trim()) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setSubmitting(true);

      await axios.post(API_BASE, {
        ...form,
        rating: Number(form.rating),
      });

      alert("Feedback Submitted Successfully ✅");

      setForm({
        name: "",
        email: "",
        rating: 5,
        feedback: "",
      });

      fetchFeedbacks();
    } catch (err) {
      console.log(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="feedback-page">
      <div className="feedback-list">
        <h1>What Our Customers Say</h1>

        {loading ? (
          <p>Loading feedback...</p>
        ) : error ? (
          <p>{error}</p>
        ) : feedbacks.length === 0 ? (
          <p>No feedback available yet. Be the first to share yours!</p>
        ) : (
          feedbacks.map((item) => (
            <div className="feedback-card" key={item._id}>
              <div className="feedback-header">
                <h3>{item.name}</h3>
                <span>{"⭐".repeat(item.rating)}</span>
              </div>

              <p>{item.feedback}</p>
            </div>
          ))
        )}
      </div>

      <div className="appointment-card">
        <h1>Give Your Feedback</h1>

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

          <select name="rating" value={form.rating} onChange={handleChange}>
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

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>

        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default Feedback;