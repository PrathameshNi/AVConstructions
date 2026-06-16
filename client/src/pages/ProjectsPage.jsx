import React, {
  useEffect,
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import axios from "axios";

import "./Style2.css";

const ProjectsPage = () => {

  const navigate = useNavigate();

  /* ================= STATES ================= */

  const [projects, setProjects] =
    useState([]);

  const [selectedImage, setSelectedImage] =
    useState(null);

  /* ================= FETCH PROJECTS ================= */

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const res = await axios.get(
        "https://avconstructions.onrender.com/api/projects"
      );

      setProjects(res.data);

    } catch (err) {

      console.log(
        "PROJECT FETCH ERROR ❌",
        err
      );
    }
  };

  return (

    <section className="projects">

      {/* ================= BACK BUTTON ================= */}

      <button
        className="back-btn"
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </button>

      {/* ================= TITLE ================= */}

      <h2 className="projects-title">
        All Projects
      </h2>

      {/* ================= PROJECT GRID ================= */}

      <div className="projects-container">

        {projects.map((project) => (

          <div
            className="project-card"
            key={project._id}
          >

            {/* IMAGE */}

            <img
              src={project.image}
              alt={project.title}
              onClick={() =>
                setSelectedImage(project.image)
              }
            />

            {/* OVERLAY */}

            <div className="overlay">

              <h3>
                {project.title}
              </h3>

              <p>
                {project.desc}
              </p>

            </div>

          </div>
        ))}

      </div>

      {/* ================= IMAGE POPUP ================= */}

      {selectedImage && (

        <div className="image-popup">

          {/* CLOSE BUTTON */}

          <span
            className="close-popup"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            ✖
          </span>

          {/* POPUP IMAGE */}

          <img
            src={selectedImage}
            alt="Project"
            className="popup-image"
          />

          {/* BACK BUTTON */}

          <button
            className="popup-back-btn"
            onClick={() =>
              setSelectedImage(null)
            }
          >
            ← Back
          </button>

        </div>
      )}

    </section>
  );
};

export default ProjectsPage;
