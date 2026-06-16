import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style2.css";

const Home = () => {
  const [content, setContent] = useState({
    title: "",
    subtitle: "",
    motive: "",
    image: "",
  });

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const res = await axios.get(
        "https://avconstructions.onrender.com/api/home-content"
      );

      setContent(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section id="home" className="home">
      <div className="home-container">

        {/* LEFT IMAGE */}
        <div className="home-left">
          <img
            src={content.image}
            alt="Construction"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="home-right">

          <h1>
            {content.title}
          </h1>

          <p className="typing">
            {content.subtitle}
          </p>

          <p className="motive">
            {content.motive}
          </p>

        </div>

      </div>
    </section>
  );
};

export default Home;
