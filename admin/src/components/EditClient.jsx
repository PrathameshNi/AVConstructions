import React from "react";

import { useNavigate }
from "react-router-dom";

import "./Style3.css";

const EditClient = () => {

  const navigate =
    useNavigate();

  return (

    <div className="edit-client-page">

      <div className="edit-client-card">

        <h1>
          🎨 Edit Client Website
        </h1>

        <div className="edit-grid">

          <button
            onClick={() =>
              navigate("/edit-home")
            }
          >
            🏠 Edit Home
          </button>

          <button
            onClick={() =>
              navigate("/edit-services")
            }
          >
            🛠 Edit Services
          </button>

          <button
            onClick={() =>
              navigate("/edit-projects")
            }
          >
            🏗 Edit Projects
          </button>

          <button
            onClick={() =>
              navigate("/edit-about")
            }
          >
            ℹ Edit About
          </button>

          {/* ✅ NEW CONTACT BUTTON */}

          <button
            onClick={() =>
              navigate("/edit-contact")
            }
          >
            📞 Edit Contact
          </button>

        </div>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/admin")
          }
        >
          ⬅ Back Dashboard
        </button>

      </div>

    </div>
  );
};

export default EditClient;