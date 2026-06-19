import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style3.css";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://avconstructions.onrender.com/api/login",
        form
      );

      if (res.data.success) {
        localStorage.setItem("token", res.data.token);

        alert("Login Successful ✅");

        navigate("/admin");
      } else {
        alert(res.data.message || "Invalid Username or Password ❌");
      }
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert(
          error.response.data.message ||
            "Invalid Username or Password ❌"
        );
      } else if (error.request) {
        alert("Unable to connect to server ❌");
      } else {
        alert("Something went wrong ❌");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
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

          <button type="submit" className="btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
