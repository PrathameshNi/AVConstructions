import React, {
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import "./Style3.css";

const AddAdmin = () => {

  const navigate =
    useNavigate();

  const [loading,
    setLoading] =
    useState(false);

  const [form,
    setForm] =
    useState({
      username: "",
      password: "",
      confirmPassword: "",
    });

  /* ================= HANDLE CHANGE ================= */

  const handleChange =
    (e) => {

    const { name, value } =
      e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ================= VALIDATION ================= */

  const validateForm =
    () => {

    const {
      username,
      password,
      confirmPassword,
    } = form;

    if (
      username.trim().length < 3
    ) {

      alert(
        "Username must be at least 3 characters ❌"
      );

      return false;
    }

    if (password.length < 6) {

      alert(
        "Password must be at least 6 characters ❌"
      );

      return false;
    }

    if (
      password !==
      confirmPassword
    ) {

      alert(
        "Passwords do not match ❌"
      );

      return false;
    }

    return true;
  };

  /* ================= ADD ADMIN ================= */

  const handleAddAdmin =
    async (e) => {

    e.preventDefault();

    if (!validateForm())
      return;

    try {

      setLoading(true);

      const token =
        localStorage.getItem(
          "token"
        );

      const res =
        await axios.post(
          "http://localhost:5000/api/add-admin",

          {
            username:
              form.username,

            password:
              form.password,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

      alert(
        res.data.message
      );

      setForm({
        username: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data
          ?.message ||
        "Error ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="add-admin-container">

      <div className="add-admin-card">

        <h2>
          ➕ Add New Admin
        </h2>

        <form
          onSubmit={handleAddAdmin}
        >

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn"
            disabled={loading}
          >
            {
              loading
              ? "Adding..."
              : "Add Admin"
            }
          </button>

        </form>

        {/* ================= VIEW ADMINS ================= */}

        <button
          className="view-admin-btn"

          onClick={() =>
            navigate(
              "/view-admins"
            )
          }
        >
          👨‍💼 View All Admins
        </button>

        <button
          className="back-btn"

          onClick={() =>
            navigate("/admin")
          }
        >
          ⬅ Back
        </button>

      </div>

    </div>
  );
};

export default AddAdmin;