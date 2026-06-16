const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// 🔐 Login API
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;