const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Event = require("../models/event");
const bcrypt = require("bcrypt");

//! register new user
router.post("/register", async (req, res) => {
  const{username,email,password}=req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
     return res.status(200).json({ message: "user already available" });
    } else {
      // Hash the password
      const saltRounds = 10; // Adjust as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser
        .save()
        .then(() => res.status(200).json({ message: "Register successfully" }));
    }
  } catch (err) {
    res.status(200).json({ message: err.message });
  }
});

//! login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
   
    // Check if user exists
    if (!user) {
      return res.status(200).json({ message: "Please signup" });
      
    }
    
    if(user){
      const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
      if (!isPasswordCorrect) {
        return res.status(200).json({ message: "Incorrect password" });
      }
      else{
        const { password, ...others } = user._doc;
        return res.status(200).json({others,message: "Login Successfully" });
      }

    }
    
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
