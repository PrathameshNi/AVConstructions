import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import "./Style2.css";

const About = () => {

  const [about,
    setAbout] =
    useState({});

  useEffect(() => {

    fetchAbout();

  }, []);

  const fetchAbout =
    async () => {

    try {

      const res =
        await axios.get(
          "https://avconstructions.onrender.com/api/about"
        );

      setAbout(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <section
      id="about"
      className="about"
    >

      <div className="about-container">

        {/* LEFT IMAGE */}

        <div className="about-left">

          <img
            src={about.image}
            alt=""
          />

        </div>

        {/* RIGHT CONTENT */}

        <div className="about-right">

          <h2>

            {about.title}

          </h2>

          <p className="about-text">

            {about.description}

          </p>

          <div className="about-stats">

            <div className="stat">

              <h3>
                {about.experience}
              </h3>

              <p>
                Years Experience
              </p>

            </div>

            <div className="stat">

              <h3>
                {about.projects}
              </h3>

              <p>
                Projects Completed
              </p>

            </div>

            <div className="stat">

              <h3>
                {about.satisfaction}
              </h3>

              <p>
                Client Satisfaction
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default About;
