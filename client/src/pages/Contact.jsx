import React,
{
  useEffect,
  useState
} from "react";

import axios from "axios";

import "./Style2.css";

const ContactUs = () => {

  const [contact,
    setContact] =
    useState({});

  useEffect(() => {

    fetchContact();

  }, []);

  const fetchContact =
    async () => {

    try {

      const res =
        await axios.get(
          "http://localhost:5000/api/contact"
        );

      setContact(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (

    <section
      id="contact"
      className="contact"
    >

      <div className="contact-container">

        <div className="contact-left">

          <h2>
            Contact <span>Us</span>
          </h2>

          <p className="contact-text">

            {contact.description}

          </p>

          <div className="contact-info">

            <div className="contact-box">

              <h3>📍 Address</h3>

              <p>
                {contact.address}
              </p>

            </div>

            <div className="contact-box">

              <h3>📞 Phone</h3>

              <p>
                {contact.phone}
              </p>

            </div>

            <div className="contact-box">

              <h3>📧 Email</h3>

              <p>
                {contact.email}
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default ContactUs;