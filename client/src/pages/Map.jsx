import React from "react";
import "./Style2.css";

const Map = () => {
  return (
    <section id="location" className="map-section">
      <div className="map-container">

        <h2>
          Our <span>Location</span>
        </h2>

        <p className="map-text">
          Visit our office at Lanja, Maharashtra for project
          consultations and construction planning.
        </p>

        <iframe
          title="Lanja Maharashtra Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122197.54637060444!2d73.45949828350653!3d16.842554676559256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1d97afe28c4df%3A0x288883dfb523a4f7!2sLanja%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1781965116211!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{
            border: 0,
            borderRadius: "15px",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
};

export default Map;