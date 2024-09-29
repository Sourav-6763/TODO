const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

//! Register new user
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists" });
    } else {
      // Hash the password
      const saltRounds = 10; // Adjust as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save();
      return res.status(200).json({ message: "Registered successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//! Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    // Check if user exists
    if (!user) {
      return res.status(200).json({ message: "Please sign up" });
    }

    const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
    if (!isPasswordCorrect) {
      return res.status(200).json({ message: "Incorrect password" });
    } else {
      const { password, ...others } = user._doc;
      // Set cookie with user ID
      req.session.userId = user._id; // Store user ID in session
      res.cookie('userId', user._id, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week
        httpOnly: true, // Prevents client-side access to the cookie
      });
      return res.status(200).json({ others, message: "Login Successfully" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
