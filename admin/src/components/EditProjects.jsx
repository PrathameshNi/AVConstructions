import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate
} from "react-router-dom";

import "./Style3.css";

const EditProjects = () => {

  const navigate =
    useNavigate();

  /* ================= STATES ================= */

  const [title,
    setTitle] =
    useState("");

  const [image,
    setImage] =
    useState(null);

  const [projects,
    setProjects] =
    useState([]);

  /* ================= FETCH PROJECTS ================= */

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

    try {

      const res =
        await axios.get(
          "https://avconstructions.onrender.com/api/projects"
        );

      setProjects(res.data);

    } catch (err) {

      console.log(
        "FETCH ERROR ❌",
        err
      );
    }
  };

  /* ================= ADD PROJECT ================= */

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    if (!title || !image) {

      return alert(
        "All fields required ❌"
      );
    }

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      const formData =
        new FormData();

      formData.append(
        "title",
        title
      );

      formData.append(
        "image",
        image
      );

      await axios.post(
        "https://avconstructions.onrender.com/api/projects",

        formData,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project Added Successfully ✅"
      );

      setTitle("");

      setImage(null);

      fetchProjects();

    } catch (err) {

      console.log(
        "UPLOAD ERROR ❌",
        err
      );

      alert(
        "Upload Failed ❌"
      );
    }
  };

  /* ================= DELETE PROJECT ================= */

  const deleteProject =
    async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete this project?"
      );

    if (!confirmDelete) return;

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.delete(
        `https://avconstructions.onrender.com/api/projects/${id}`,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Project Deleted ✅"
      );

      fetchProjects();

    } catch (err) {

      console.log(
        "DELETE ERROR ❌",
        err
      );

      alert(
        "Delete Failed ❌"
      );
    }
  };

  return (

    <div className="edit-projects">

      <div className="projects-card">

        {/* ================= TITLE ================= */}

        <h1>
          🏗 Manage Projects
        </h1>

        {/* ================= BACK BUTTON ================= */}

        <button
          className="back-btn"
          onClick={() =>
            navigate("/edit-client")
          }
        >
          ← Back
        </button>

        {/* ================= FORM ================= */}

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"

            placeholder="Project Title"

            value={title}

            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }

            required
          />

          <input
            type="file"

            accept="image/*"

            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }

            required
          />

          <button type="submit">
            Add Project
          </button>

        </form>

        {/* ================= PROJECT GRID ================= */}

        <div className="projects-grid">

          {projects.map(
            (project) => (

            <div
              className="project-item"

              key={project._id}
            >

              <img
                src={project.image}
                alt={project.title}
              />

              <h3>
                {project.title}
              </h3>

              <button
                className="delete-btn"

                onClick={() =>
                  deleteProject(
                    project._id
                  )
                }
              >
                Delete
              </button>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};

export default EditProjects;
