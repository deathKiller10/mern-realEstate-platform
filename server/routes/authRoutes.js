const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");

const router = express.Router();



/*
REGISTER
POST /api/auth/register
*/
router.post("/register", async (req, res) => {

  try {

    const { name, mobile, email, password, role } = req.body;


    if (!name || !mobile || !email || !password) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }


    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
      });

    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({
      name,
      mobile,
      email,
      password: hashedPassword,
      role
    });


    await user.save();


    res.status(201).json({
      message: "User registered successfully"
    });


  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
LOGIN
POST /api/auth/login
*/
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "Invalid email or password"
      });

    }


    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid email or password"
      });

    }


    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );


    res.json({

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        role: user.role
      }

    });

  }
  catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
/*
FORGOT PASSWORD
POST /api/auth/forgot-password
*/
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // generate token
    const token = crypto.randomBytes(32).toString("hex");

    // save token in DB
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000;

    await user.save();

    // ✅ create reset link (IMPORTANT)
    const resetLink = `http://localhost:5173/reset-password/${token}`;

    // ✅ send email
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click below to reset password:</p>
             <a href="${resetLink}">${resetLink}</a>`,
    });

    res.json({
      message: "Reset link sent to email"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
/*
RESET PASSWORD
POST /api/auth/reset-password/:token
*/
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // find user with valid token
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // remove token after use
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;