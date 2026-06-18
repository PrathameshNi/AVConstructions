import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Style3.css";

const EditHome = () => {

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState("");

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    motive: "",
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchHomeContent();
  }, []);

  /* ================= FETCH DATA ================= */
  const fetchHomeContent = async () => {

    try {

      const res = await axios.get(
        "https://avconstructions.onrender.com/api/home-content"
      );

      setForm({
        title: res.data.title || "",
        subtitle: res.data.subtitle || "",
        motive: res.data.motive || "",
      });

      setPreview(res.data.image);

    } catch (err) {
      console.log(err);
    }
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE IMAGE ================= */
  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const token = localStorage.getItem("token");

      const formData = new FormData();

      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("motive", form.motive);

      if (image) {
        formData.append("image", image);
      }

      const res = await axios.put(
        "http://localhost:5000/api/home-content",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

    } catch (err) {

      console.log(err);

      alert("Update Failed ❌");

    } finally {

      setLoading(false);
    }
  };

  const navigate = useNavigate();
  return (
    <div className="edit-home">

      <div className="edit-home-card">

        <h1>🏗 Edit Home Page</h1>

        <form onSubmit={handleSubmit}>

          <div className="input-group">
            <label>Title</label>

            <input
              type="text"
              name="title"
              placeholder="Enter Title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Subtitle</label>

            <input
              type="text"
              name="subtitle"
              placeholder="Enter Subtitle"
              value={form.subtitle}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Motive</label>

            <textarea
              name="motive"
              placeholder="Enter Motive"
              rows="5"
              value={form.motive}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Upload Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
            />
          </div>

          {preview && (
            <div className="preview-box">

              <img
                src={preview}
                alt="Preview"
              />

            </div>
          )}

          <button
            type="submit"
            className="update-btn"
          >
            {loading ? "Updating..." : "Update Home"}
          </button>

           <button
          className="back-btn"
          onClick={() => navigate("/edit-client")}
        >
          ⬅ Back Dashboard
          </button>
        </form>

      </div>

    </div>
  );
};

export default EditHome;
