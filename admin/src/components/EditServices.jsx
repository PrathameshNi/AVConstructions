import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style3.css";

const EditServices = () => {

  const [loading, setLoading] =
    useState(false);

  const [services, setServices] =
    useState([]);

  /* ================= FETCH ================= */

  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices = async () => {

    try {

      const res = await axios.get(
        "https://avconstructions.onrender.com/api/services"
      );

      setServices(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  /* ================= HANDLE CHANGE ================= */

  const handleChange = (
    index,
    field,
    value
  ) => {

    const updated = [...services];

    updated[index][field] = value;

    setServices(updated);
  };

  /* ================= ADD SERVICE ================= */

  const addService = () => {

    setServices([
      ...services,

      {
        title: "",
        desc: "",
      },
    ]);
  };

  /* ================= DELETE ================= */

  const deleteService = (index) => {

    const confirmDelete =
      window.confirm(
        "Delete this service?"
      );

    if (!confirmDelete) return;

    const updated =
      services.filter(
        (_, i) => i !== index
      );

    setServices(updated);
  };

  /* ================= SAVE ================= */

  const handleSubmit = async () => {

    try {

      // Validation
      for (let service of services) {

        if (
          !service.title.trim() ||
          !service.desc.trim()
        ) {

          return alert(
            "All fields are required ❌"
          );
        }
      }

      setLoading(true);

      const token =
        localStorage.getItem("token");

      await axios.put(
        "http://localhost:5000/api/services",

        { services },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Services Updated Successfully ✅"
      );

    } catch (err) {

      console.log(err);

      alert("Update Failed ❌");

    } finally {

      setLoading(false);
    }
  };

  const Navigate = useNavigate();

  return (
    <div className="edit-services">

      <div className="services-card">

        <div className="top-bar">

          <h1>
            🛠 Manage Services
          </h1>

          <button
            className="add-btn"
            onClick={addService}
          >
            + Add Service
          </button>

        </div>

        {services.map(
          (service, index) => (

          <div
            className="service-box"
            key={index}
          >

            <div className="service-header">

              <h3>
                Service {index + 1}
              </h3>

              <button
                className="delete-btn"

                onClick={() =>
                  deleteService(index)
                }
              >
                Delete
              </button>

            </div>

            <input
              type="text"

              placeholder="Enter Service Title"

              value={service.title}

              onChange={(e) =>
                handleChange(
                  index,
                  "title",
                  e.target.value
                )
              }
            />

            <textarea
              placeholder="Enter Service Description"

              value={service.desc}

              onChange={(e) =>
                handleChange(
                  index,
                  "desc",
                  e.target.value
                )
              }
            />

          </div>
        ))}

        <button
          className="save-btn"
          onClick={handleSubmit}
        >
          {
            loading
              ? "Saving..."
              : "Save Changes"
          }
        </button>

          <button
          className="back-btn"
          onClick={() => Navigate("/edit-client")}
        >
          ⬅ Back Dashboard
        </button>

      </div>

    </div>
  );
};

export default EditServices;
