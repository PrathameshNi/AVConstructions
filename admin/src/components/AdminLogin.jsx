import React, { useState } from "react";
import axios from "axios";
import './Style3.css';

const AdminLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // important

    try {
      const res = await axios.post(
        "https://avconstructions.onrender.com/api/login",
        form
      );

      if (res.data.success) {
        alert("Login Successful ✅");

        // ✅ store JWT token
        localStorage.setItem("token", res.data.token);

        // ✅ redirect to admin dashboard
        window.location.href = "/admin";
      } else {
        alert(res.data.message || "Invalid credentials ❌");
      }

    } catch (error) {
      console.error(error);
      alert("Server error ❌");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>

        <form onSubmit={handleLogin}>
          <input
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
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
