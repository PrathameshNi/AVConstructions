import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style2.css";

const ContactUs = () => {
  const [contact, setContact] = useState({});

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await axios.get(
        "https://avconstructions.onrender.com/api/contact"
      );

      setContact(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <footer id="contact" className="footer">

      <div className="footer-grid">

        {/* Company */}

        <div className="footer-brand">

          <h2 className="footer-logo">
            AV Construction
          </h2>

          <p>
            {contact?.description ||
              "Building excellence across every project with quality and trust."}
          </p>

          <div className="footer-socials">

            <a
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
            >
              <i className="fa-brands fa-linkedin-in"></i>
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Twitter"
            >
              <i className="fa-brands fa-x-twitter"></i>
            </a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <span
                onClick={() =>
                  document.getElementById("home")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Home
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document.getElementById("services")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Services
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document.getElementById("projects")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Projects
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document.getElementById("about")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                About Us
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document.getElementById("location")
                    ?.scrollIntoView({
                      behavior: "smooth",
                    })
                }
              >
                Location
              </span>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-col">

          <h3>Contact Info</h3>

          <ul>

            <li>
              <i className="fa-solid fa-location-dot"></i>

              <span>
                {contact?.address}
              </span>
            </li>

            <li>

              <a href={`tel:${contact?.phone}`}>

                <i className="fa-solid fa-phone"></i>

                {contact?.phone}

              </a>

            </li>

            <li>

              <a href={`mailto:${contact?.email}`}>

                <i className="fa-solid fa-envelope"></i>

                {contact?.email}

              </a>

            </li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        <p>

          © {new Date().getFullYear()} AV Construction & Developers.

          All Rights Reserved.

        </p>

      </div>

    </footer>
  );
};

export default ContactUs;