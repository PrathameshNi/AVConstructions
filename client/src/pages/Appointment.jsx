import React, {
  useState,
} from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

import "./Style2.css";

const Appointment = () => {

  const navigate =
    useNavigate();

  const [form,
    setForm] =
    useState({

      name: "",

      email: "",

      phone: "",

      date: "",

      message: "",
    });

  /* ================= CHANGE ================= */

  const handleChange =
    (e) => {

    setForm({
      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  /* ================= SUBMIT ================= */

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "https://avconstructions.onrender.com/api/appointments",

        form
      );

      alert(
        "Appointment Booked ✅"
      );

      setForm({

        name: "",

        email: "",

        phone: "",

        date: "",

        message: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        "Booking Failed ❌"
      );
    }
  };

  return (
    <section className="appointment">

      <div className="appointment-container">

        <button
          className="back-btn"

          onClick={() =>
            navigate("/")
          }
        >
          ← Back to Home
        </button>

        <h2>
          Book <span>Appointment</span>
        </h2>

        <p className="subtitle">

          Fill the form below
          and we will get back
          to you shortly.

        </p>

        <form
          className="appointment-form"

          onSubmit={handleSubmit}
        >

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

          <input
            type="tel"

            name="phone"

            placeholder="Phone Number"

            value={form.phone}

            onChange={handleChange}

            required
          />

          <input
            type="date"

            name="date"

            value={form.date}

            onChange={handleChange}

            required
          />

          <textarea
            name="message"

            placeholder="Your Message"

            rows="4"

            value={form.message}

            onChange={handleChange}
          />

          <button type="submit">
            Submit
          </button>

        </form>

      </div>

    </section>
  );
};

export default Appointment;
