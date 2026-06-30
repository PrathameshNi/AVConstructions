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


          <p>
            {contact.description}
          </p>

          <div className="footer-socials">

            <a href="#" className="social-btn" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-btn" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#" className="social-btn" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
              <a href="#" className="social-btn" aria-label="Twitter/X"><i className="fa-brands fa-x-twitter"></i></a>

          </div>

        </div>

        {/* Quick Links */}

        <div className="footer-col">

          <h3>Quick Links</h3>

          <ul>

            <li>
              <span
                onClick={() =>
                  document
                    .getElementById("home")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Home
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Services
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document
                    .getElementById("projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Projects
              </span>
            </li>

            <li>
              <span
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                About
              </span>
            </li>

          </ul>

        </div>

        {/* Contact */}

        <div className="footer-col">

          <h3>Contact Info</h3>

          <ul>

            <li>
              📍 {contact.address}
            </li>

            <li>
              <a href={`tel:${contact.phone}`}>
                📞 {contact.phone}
              </a>
            </li>

            <li>
              <a href={`mailto:${contact.email}`}>
                📧 {contact.email}
              </a>
            </li>

          </ul>

        </div>

      </div>

      <div className="footer-bottom">

        © {new Date().getFullYear()} AV Construction & Developers.
        All Rights Reserved.

      </div>

    </footer>
  );
};

export default ContactUs;