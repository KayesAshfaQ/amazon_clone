const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

// SIGNUP API
authRouter.post("/api/signup", async (req, res) => {
  try {
    // get the data from client
    const { name, email, password } = req.body;

    // validate the data
    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 8);

    // post the data in db
    let user = new User({ name, email, password: hashedPassword });
    user = await user.save();

    // return response to client
    res.status(201).json({
      message: "user created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// LOGIN API
authRouter.post("/api/login", async (req, res) => {
  try {
    // get the data from client
    const { email, password } = req.body;

    // validate the data
    // check if user exists or not in db with email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    // check if password matches with the user's password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    // generate token
    const token = jwt.sign({ id: user._id }, "passwordKey", {
      expiresIn: "1h",
    });

    // return response to client
    res.status(200).json({
      message: "logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        type: user.type,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = authRouter;
