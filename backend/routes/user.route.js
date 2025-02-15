const express = require("express");
const User = require("../models/user.model.js");
const {jwtAuthToken,  generateToken} = require('../services/jwtAuth.service.js');
const  router = express.Router();

router.get("/details",jwtAuthToken, async (req, res) => {
  try {
    const user = await User.find();

    return res.status(200).json({ message: "All user's list", user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email:email});

    if (!user || !(await user.ComparePassword(password))){
      return res.status(401).json({ message: "user not found" });
    }
    return res.status(200).json({ message: "user logged in successfully",user: { id: user.id, name: user.name, role: user.role }});
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ error: "internal server error" });
  }
});

router.post("/signup", async (req, res) => {
  const { username, password, email, role } = req.body;

  try {
    const user = await User.create({
      username,
      password,
      email,
      role,
    });

    const payload = {
      username: user.username,
      password:user.password,
      id:user.id
    }
   const token = generateToken(payload);
   console.log(token);
    return res.status(200).json({ message: "user created successfully", user,token });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(error.message);
  }
});

module.exports = router;
