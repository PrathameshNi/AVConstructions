import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Style2.css";

const Services = () => {

  const [servicesData, setServicesData] =
    useState([]);

  useEffect(() => {

    fetchServices();

  }, []);

  const fetchServices = async () => {

    try {

      const res = await axios.get(
        "https://avconstructions.onrender.com/api/services"
      );

      setServicesData(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  return (
    <section
      id="services"
      className="services"
    >

      <h2 className="services-title">
        Our Services
      </h2>

      <div className="services-container">

        {servicesData.map(
          (service, index) => (

          <div
            className="service-card"
            key={index}
          >

            <h3>{service.title}</h3>

            <p>{service.desc}</p>

          </div>
        ))}

      </div>
    </section>
  );
};

export default Services;
