import React from "react";
import "./Style2.css";

const Feedback = () => {
  const feedbacks = [
    {
      name: "Rahul Patil",
      feedback:
        "Excellent construction quality and timely project delivery. Highly recommended!",
    },
    {
      name: "Sneha Desai",
      feedback:
        "Professional team with great attention to detail. Our dream home became reality.",
    },
    {
      name: "Amit Joshi",
      feedback:
        "Very satisfied with the workmanship and communication throughout the project.",
    },
  ];

  return (
    <section id="feedback" className="feedback-section">

      <div className="feedback-container">

        <h2>
          Client <span>Feedback</span>
        </h2>

        <p className="feedback-text">
          Here's what our valued clients say about our work.
        </p>

        <div className="feedback-grid">

          {feedbacks.map((item, index) => (
            <div className="feedback-card" key={index}>

              <div className="stars">
                ⭐⭐⭐⭐⭐
              </div>

              <p>"{item.feedback}"</p>

              <h4>- {item.name}</h4>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default Feedback;