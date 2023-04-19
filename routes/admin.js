const express = require('express');
const router = express.Router();
const Admin = require("../models/Admin")
// Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ username });
  
      if (!admin) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
  
      const isMatch = await password===admin.password;
  
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
      res.json({ admin });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  });

module.exports = router;
