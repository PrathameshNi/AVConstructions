import React from "react";
import "./Style2.css";

const Map = ({ contact }) => {
  return (
    <section className="location-footer">

      <div className="location-footer-container">

        {/* LEFT SIDE - MAP */}

        <div className="location-map">

          <h2>
            Our <span>Location</span>
          </h2>

          <p className="map-text">
            Visit our office for project consultations and planning.
          </p>

          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122197.54637060444!2d73.45949828350653!3d16.842554676559256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1d97afe28c4df%3A0x288883dfb523a4f7!2sLanja%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781965116211!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

        </div>

        {/* RIGHT SIDE */}

        <div className="footer-content">

          <img
            src="/logo.jpg"
            alt="AV Construction"
            className="footer-logo"
          />

          <p>
            Building excellence across every project. Trusted by hundreds of
            clients for quality construction and development services.
          </p>

          <div className="footer-info">

            <h3>Contact Information</h3>

            <p>
              📍 {contact?.address || "Lanja, Maharashtra"}
            </p>

            <p>
              📞{" "}
              <a href={`tel:${contact?.phone || "+919876543210"}`}>
                {contact?.phone || "+91 9876543210"}
              </a>
            </p>

            <p>
              📧{" "}
              <a
                href={`mailto:${
                  contact?.email || "avconstruction@gmail.com"
                }`}
              >
                {contact?.email || "avconstruction@gmail.com"}
              </a>
            </p>

          </div>

          <div className="footer-links">

            <h3>Quick Links</h3>

            <span
              onClick={() =>
                document
                  .getElementById("home")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Home
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("services")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Services
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Projects
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              About
            </span>

            <span
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Contact
            </span>

          </div>

          <div className="footer-social">

            <a href="#">
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a href="#">
              <i className="fa-brands fa-x-twitter"></i>
            </a>

          </div>

        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} AV Construction & Developers. All Rights
        Reserved.
      </div>

    </section>
  );
};

export default Map;