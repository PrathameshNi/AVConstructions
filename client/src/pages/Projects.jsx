import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

import "./Style2.css";

const Projects = () => {

  const navigate =
    useNavigate();

  const [projects,
    setProjects] =
    useState([]);

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects =
    async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/projects"
        );

      setProjects(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <section
      id="projects"
      className="projects"
    >

      <h2 className="projects-title">
        Our Projects
      </h2>

      <div className="projects-container">

  {projects
    .slice(0, 3)
    .map((project) => (

    <div
      className="project-card"
      key={project._id}
    >

      <img
        src={project.image}
        alt={project.title}
      />

      <div className="overlay">

        <h3>
          {project.title}
        </h3>

      </div>

    </div>
  ))}

</div>

      <button
        className="view-btn"

        onClick={() =>
          navigate("/projects")
        }
      >
        View More →
      </button>

    </section>
  );
};

export default Projects;