import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Style3.css";

import { useNavigate } from "react-router-dom";

const EditAbout = () => {

  const [form,
    setForm] =
    useState({

      title: "",

      description: "",

      experience: "",

      projects: "",

      satisfaction: "",
    });

  const [image,
    setImage] =
    useState(null);

  /* ================= FETCH ================= */

  useEffect(() => {

    fetchAbout();

  }, []);

  const fetchAbout =
    async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/about"
        );

      setForm(res.data);

    } catch (err) {

      console.log(err);
    }
  };

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

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      Object.keys(form).forEach(
        (key) => {

          formData.append(
            key,
            form[key]
          );
        }
      );

      if (image) {

        formData.append(
          "image",
          image
        );
      }

      await axios.put(
        "http://localhost:5000/api/about",

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "About Updated ✅"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Update Failed ❌"
      );
    }
  };

  const navigate = useNavigate();

  return (
    <div className="edit-about">

      <div className="about-card">

        <h1>
          ✏ Edit About
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"

            name="title"

            placeholder="Title"

            value={form.title}

            onChange={handleChange}
          />

          <textarea
            name="description"

            placeholder="Description"

            value={
              form.description
            }

            onChange={handleChange}
          />

          <input
            type="text"

            name="experience"

            placeholder="Experience"

            value={
              form.experience
            }

            onChange={handleChange}
          />

          <input
            type="text"

            name="projects"

            placeholder="Projects"

            value={
              form.projects
            }

            onChange={handleChange}
          />

          <input
            type="text"

            name="satisfaction"

            placeholder="Satisfaction"

            value={
              form.satisfaction
            }

            onChange={handleChange}
          />

          <input
            type="file"

            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
          />

          <button type="submit">
            Save Changes
          </button>

        
          <button
          className="back-btn"
          onClick={() => navigate("/admin")}
        >
          ⬅ Back Dashboard
        </button>

        </form>

      </div>

    </div>
  );
};

export default EditAbout;