import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "./Style3.css";

const ViewAdmins = () => {

  const navigate =
    useNavigate();

  const [admins,
    setAdmins] =
    useState([]);

  /* ================= FETCH ADMINS ================= */

  useEffect(() => {

    fetchAdmins();

  }, []);

  const fetchAdmins =
    async () => {

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.get(
          "https://avconstructions.onrender.com/api/admins",

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      setAdmins(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  /* ================= DELETE ADMIN ================= */

  const deleteAdmin =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this admin?"
      );

    if (!confirmDelete)
      return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `http://localhost:5000/api/admins/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Admin Deleted ✅"
      );

      fetchAdmins();

    } catch (err) {

      console.log(err);

      alert(
        "Delete Failed ❌"
      );
    }
  };

  return (

    <div className="view-admin-page">

      <div className="view-admin-card">

        <h1>
          👨‍💼 All Admins
        </h1>

        <div className="admin-list">

          {
            admins.length === 0
            ? (
              <p>
                No Admin Found
              </p>
            )
            : (
              admins.map(
                (admin) => (

                <div
                  className="admin-item"
                  key={admin._id}
                >

                  <h3>
                    {admin.username}
                  </h3>

                  <button
                    onClick={() =>
                      deleteAdmin(
                        admin._id
                      )
                    }
                  >
                    Delete
                  </button>

                </div>
              ))
            )
          }

        </div>

        <button
          className="back-btn"

          onClick={() =>
            navigate(
              "/add-admin"
            )
          }
        >
          ⬅ Back
        </button>

      </div>

    </div>
  );
};

export default ViewAdmins;
