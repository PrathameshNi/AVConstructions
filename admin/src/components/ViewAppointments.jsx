import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Style3.css";

const Appointments = () => {

  const [appointments,
    setAppointments] =
    useState([]);

  useEffect(() => {

    fetchAppointments();

  }, []);

  /* ================= FETCH ================= */

  const fetchAppointments =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://avconstructions.onrender.com/api/appointments",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAppointments(
        res.data
      );

    } catch (err) {

      console.log(err);
    }
  };

  /* ================= DELETE ================= */

  const deleteAppointment =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete Appointment?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `https://avconstructions.onrender.com/api/appointments/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      fetchAppointments();

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <div className="appointments">

      <div className="appointments-card">

        <h1>
          📅 Appointments
        </h1>

        {appointments.length === 0 ? (

          <p>
            No appointments found
          </p>

        ) : (

          appointments.map(
            (item) => (

            <div
              className="appointment-box"

              key={item._id}
            >

              <h3>
                {item.name}
              </h3>

              <p>
                <strong>Email:</strong>
                {item.email}
              </p>

              <p>
                <strong>Phone:</strong>
                {item.phone}
              </p>

              <p>
                <strong>Date:</strong>
                {item.date}
              </p>

              <p>
                <strong>Message:</strong>
                {item.message}
              </p>

              <button
                onClick={() =>
                  deleteAppointment(
                    item._id
                  )
                }
              >
                Delete
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
};

export default Appointments;
