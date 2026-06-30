import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style3.css";

const ViewFeedback = () => {
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("token");

      // protected route — admin token required
      const res = await axios.get(
        "https://avconstructions.onrender.com/api/feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedbacks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm("Delete this feedback?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `https://avconstructions.onrender.com/api/feedback/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchFeedbacks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="appointments-page">
      <div className="appointments-card">
        <h1>Client Feedback</h1>

        <button className="back-btn" onClick={() => navigate("/admin")}>
          ← Back
        </button>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {feedbacks.map((item) => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{"⭐".repeat(item.rating)}</td>
                <td>{item.feedback}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteFeedback(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewFeedback;