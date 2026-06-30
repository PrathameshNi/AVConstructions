import React from "react";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollTo = (id) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="navbar">

      <div className="logo-container">
        <img
          src={logo}
          alt="Company Logo"
          className="logo-img"
        />
      </div>

      <div className="nav-links">

        <span onClick={() => scrollTo("home")}>
          Home
        </span>

        <span onClick={() => scrollTo("services")}>
          Services
        </span>

        <span onClick={() => scrollTo("projects")}>
          Projects
        </span>

        <span onClick={() => scrollTo("about")}>
          About
        </span>

        <span onClick={() => scrollTo("contact")}>
          Contact
        </span>

        {/* Navigate to Feedback Page */}
       <button
  className="btn"
  onClick={() => navigate("/feedback")}
>
  Feedback
</button>

<button
  className="btn"
  onClick={() => navigate("/appointment")}
>
  Book Appointment
</button>

      </div>

    </nav>
  );
};

export default Navbar;