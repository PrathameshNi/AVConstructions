import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="admin-page">
  <div className="admin-card">
    <h1>Admin Dashboard</h1>

    <button onClick={() => navigate("/edit-client")}>
      Edit Client Page
    </button>

    <button onClick={() => navigate("/billing")}>
      Billing
    </button>

    <button onClick={() => navigate("/add-admin")}>
      Add Admin
    </button>

    <button onClick={() => navigate("/appointments") }
>     Appointments
   </button>

    <button className="btn-logout" onClick={logout}>
      Logout
    </button>
  </div>
</div>
  );
};

export default AdminHome;