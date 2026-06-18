import React,
{
  useEffect,
  useState
} from "react";

import axios from "axios";

import { useNavigate }
from "react-router-dom";

import "./Style3.css";

const EditContact = () => {

  const navigate =
    useNavigate();

  const [form,
    setForm] =
    useState({

      address: "",

      phone: "",

      email: "",

      description: "",
    });

  useEffect(() => {

    fetchContact();

  }, []);

  const fetchContact =
    async () => {

    try {

      const res =
        await axios.get(
          "https://avconstructions.onrender.com/api/contact"
        );

      setForm(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  const handleChange =
    (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {

    e.preventDefault();

    try {

      const token =
        localStorage.getItem(
          "token"
        );

      await axios.put(
        "http://localhost:5000/api/contact",

        form,

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      alert(
        "Contact Updated ✅"
      );

    } catch (err) {

      console.log(err);

      alert(
        "Update Failed ❌"
      );
    }
  };

  return (

    <div className="edit-projects">

      <div className="projects-card">

        <h1>
          📞 Edit Contact
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <button type="submit">

            Update Contact

          </button>

        </form>

        <button
          className="back-btn"
          onClick={() =>
            navigate("/admin")
          }
        >

          ⬅ Back

        </button>

      </div>

    </div>
  );
};

export default EditContact;
