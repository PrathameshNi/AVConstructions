const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config();

/* ================= IMPORTS ================= */

const upload = require("./middleware/upload");

const Admin = require("./models/Admin");

const HomeContent = require("./models/HomeContent");
 
const verifyToken = require("./middleware/authMiddleware");

const Service = require("./models/Service");

const Project = require("./models/Project");

const About = require("./models/About");

const Appointment = require("./models/Appointment");

const Contact = require("./models/Contact");

/* ================= APP ================= */

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());

app.use(cors());

app.use("/uploads", express.static("uploads"));

/* ================= ENV ================= */

const PORT = process.env.PORT || 5000;

const MONGO_URL = process.env.MONGO_URL;

const JWT_SECRET = process.env.JWT_SECRET;



/* ================= MONGODB ================= */

mongoose
  .connect("mongodb+srv://nivdekarprathamesh3_db_user:kc8v7a2AHZ512cRx@cluster0.wnv2hkj.mongodb.net/?appName=Cluster0")
  .then(async () => {

    console.log("MongoDB Connected ✅");

    

  })
  .catch((err) => {

    console.log(
      "Mongo Error ❌",
      err.message
    );
  });


/* ================= LOGIN ================= */

app.post("/api/login", async (req, res) => {

  try {

    const { username, password } = req.body;

    if (!username || !password) {

      return res.status(400).json({
        success: false,
        message:
          "All fields are required ❌",
      });
    }

    const admin = await Admin.findOne({
      username,
    });

    if (!admin) {

      return res.status(404).json({
        success: false,
        message: "User not found ❌",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      admin.password
    );

    if (!isMatch) {

      return res.status(401).json({
        success: false,
        message:
          "Wrong password ❌",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      "mysecretkey123",
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful ✅",
      token,
    });

  } catch (err) {

    console.log(
      "LOGIN ERROR ❌",
      err.message
    );

    res.status(500).json({
      success: false,
      message: "check usename or password ❌",
    });
  }
});

/* ================= ADD ADMIN ================= */

app.post(
  "/api/add-admin",
  verifyToken,
  async (req, res) => {

    try {

      const { username, password } =
        req.body;

      if (!username || !password) {

        return res.status(400).json({
          message:
            "All fields required ❌",
        });
      }

      if (username.length < 3) {

        return res.status(400).json({
          message:
            "Username must be at least 3 characters ❌",
        });
      }

      if (password.length < 6) {

        return res.status(400).json({
          message:
            "Password must be at least 6 characters ❌",
        });
      }

      const existing =
        await Admin.findOne({
          username,
        });

      if (existing) {

        return res.status(400).json({
          message:
            "Admin already exists ❌",
        });
      }

      const hashedPassword =
        await bcrypt.hash(password, 10);

      await Admin.create({
        username,
        password: hashedPassword,
      });

      res.status(201).json({
        success: true,
        message:
          "Admin added successfully ✅",
      });

    } catch (err) {

      console.log(
        "ADD ADMIN ERROR ❌",
        err.message
      );

      res.status(500).json({
        success: false,
        message: "Server error ❌",
      });
    }
  }
);

/* ================= GET HOME CONTENT ================= */

app.get(
  "/api/home-content",
  async (req, res) => {

    try {

      let content =
        await HomeContent.findOne();

      if (!content) {

        content =
          await HomeContent.create({
            title:
              "Welcome to Zore Constructions",

            subtitle:
              "We build your dream projects 🚧",

            motive:
              "Our mission is to deliver high-quality construction solutions.",

            image: "",
          });
      }

      res.json(content);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= UPDATE HOME CONTENT ================= */

app.put(
  "/api/home-content",
  verifyToken,
  upload.single("image"),

  async (req, res) => {

    try {

      const {
        title,
        subtitle,
        motive,
      } = req.body;

      let content =
        await HomeContent.findOne();

      if (!content) {

        content =
          new HomeContent();
      }

      content.title = title;

      content.subtitle = subtitle;

      content.motive = motive;

      if (req.file) {

        content.image = req.file.path;
      }

      await content.save();

      res.status(200).json({
        success: true,
        message:
          "Home page updated ✅",
      });

    } catch (err) {

      console.log(
        "UPDATE ERROR ❌",
        err
      );

      res.status(500).json({
        success: false,
        message:
          "Server Error ❌",
      });
    }
  }
);
/* ================= GET SERVICES ================= */

app.get("/api/services", async (req, res) => {

  try {

    let services = await Service.find();

    if (services.length === 0) {

      await Service.insertMany([
        {
          title: "Residential Construction",
          desc:
            "We build modern and durable homes with high-quality materials."
        },

        {
          title: "Commercial Projects",
          desc:
            "Professional construction services for offices, malls, and complexes."
        },

        {
          title: "Renovation",
          desc:
            "Transform your old spaces into modern and functional designs."
        },

        {
          title: "Interior Design",
          desc:
            "Elegant and smart interior solutions tailored to your needs."
        }
      ]);

      services = await Service.find();
    }

    res.json(services);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});

/* ================= UPDATE SERVICES ================= */

app.put(
  "/api/services",
  verifyToken,

  async (req, res) => {

    try {

      const { services } = req.body;

      await Service.deleteMany();

      await Service.insertMany(services);

      res.json({
        success: true,
        message:
          "Services Updated Successfully ✅"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message: "Server Error ❌"
      });
    }
  }
); 

/* ================= GET PROJECTS ================= */

app.get(
  "/api/projects",

  async (req, res) => {

    try {

      const projects =
        await Project.find();

      res.json(projects);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= UPDATE PROJECTS ================= */

app.post(
  "/api/projects",

  verifyToken,

  upload.single("image"),

  async (req, res) => {

    try {

      const { title } = req.body;

      const image =
        `http://localhost:${PORT}/uploads/${req.file.filename}`;

      await Project.create({
        title,
        image,
      });

      res.json({
        success: true,
        message:
          "Project Added Successfully ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= DELETE PROJECT ================= */

app.delete(
  "/api/projects/:id",

  verifyToken,

  async (req, res) => {

    try {

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Project Deleted ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= GET ABOUT ================= */

app.get(
  "/api/about",

  async (req, res) => {

    try {

      let about =
        await About.findOne();

      if (!about) {

        about =
          await About.create({

            title: "About Us",

            description:
              "We are a trusted construction company with years of experience in delivering high-quality residential and commercial projects.",

            experience: "10+",

            projects: "50+",

            satisfaction: "100%",

            image: "",
          });
      }

      res.json(about);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= UPDATE ABOUT ================= */

app.put(
  "/api/about",

  verifyToken,

  upload.single("image"),

  async (req, res) => {

    try {

      const {
        title,
        description,
        experience,
        projects,
        satisfaction,
      } = req.body;

      let about =
        await About.findOne();

      if (!about) {

        about = new About();
      }

      about.title = title;

      about.description =
        description;

      about.experience =
        experience;

      about.projects =
        projects;

      about.satisfaction =
        satisfaction;

      if (req.file) {

        about.image =
          `http://localhost:${PORT}/uploads/${req.file.filename}`;
      }

      await about.save();

      res.json({
        success: true,
        message:
          "About Updated Successfully ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= CREATE APPOINTMENT ================= */

app.post(
  "/api/appointments",

  async (req, res) => {

    try {

      const {
        name,
        email,
        phone,
        date,
        message,
      } = req.body;

      if (
        !name ||
        !email ||
        !phone ||
        !date
      ) {

        return res.status(400).json({
          message:
            "All fields required ❌",
        });
      }

      await Appointment.create({

        name,

        email,

        phone,

        date,

        message,
      });

      res.json({
        success: true,
        message:
          "Appointment Booked ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= GET APPOINTMENTS ================= */

app.get(
  "/api/appointments",

  verifyToken,

  async (req, res) => {

    try {

      const appointments =
        await Appointment.find()
        .sort({ createdAt: -1 });

      res.json(appointments);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= DELETE APPOINTMENT ================= */

app.delete(
  "/api/appointments/:id",

  verifyToken,

  async (req, res) => {

    try {

      await Appointment.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Appointment Deleted ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= GET ADMINS ================= */

app.get(
  "/api/admins",

  verifyToken,

  async (req, res) => {

    try {

      const admins =
        await Admin.find();

      res.json(admins);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);
/* ================= DELETE ADMIN ================= */

app.delete(
  "/api/admins/:id",

  verifyToken,

  async (req, res) => {

    try {

      await Admin.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message:
          "Admin Deleted ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= GET CONTACT ================= */

app.get(
  "/api/contact",

  async (req, res) => {

    try {

      let contact =
        await Contact.findOne();

      if (!contact) {

        contact =
          await Contact.create({});
      }

      res.json(contact);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= UPDATE CONTACT ================= */

app.put(
  "/api/contact",

  verifyToken,

  async (req, res) => {

    try {

      const {
        address,
        phone,
        email,
        description,
      } = req.body;

      let contact =
        await Contact.findOne();

      if (!contact) {

        contact =
          new Contact();
      }

      contact.address =
        address;

      contact.phone =
        phone;

      contact.email =
        email;

      contact.description =
        description;

      await contact.save();

      res.json({
        success: true,
        message:
          "Contact Updated ✅",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Server Error ❌",
      });
    }
  }
);

/* ================= SERVER ================= */

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT} 🚀`
  );
});
