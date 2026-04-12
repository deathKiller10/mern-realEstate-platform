const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

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

    if (user.isBlocked) {
      return res.status(403).json({ 
        message: "Your account has been suspended by an administrator." 
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
      // Standard security practice: Don't explicitly say "User not found" to prevent email enumeration,
      // but for an MVP/School project, it's totally fine and helpful for debugging.
      return res.status(404).json({ message: "User with this email does not exist" });
    }

    // 1. Generate a temporary token that expires in 15 minutes
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    // 2. Construct the frontend reset link
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    
    // 3. Log it beautifully to the terminal
    console.log("\n=======================================================");
    console.log("🔒 PASSWORD RESET REQUESTED");
    console.log(`📧 For User: ${user.email}`);
    console.log(`🔗 Click here to reset: ${resetLink}`);
    console.log("=======================================================\n");

    res.json({ message: "Password reset link generated. Check your server terminal." });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

    if (!password || password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    // 1. Verify the token hasn't expired or been tampered with
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // 2. Find the user attached to this token
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Hash the new password and save it
    user.password = await bcrypt.hash(password, 10);
    await user.save();

    res.json({ message: "Password reset successful! You can now log in." });
  } catch (error) {
    // Distinguish between an expired token and a completely fake one
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Reset link has expired. Please request a new one." });
    }
    res.status(500).json({ message: "Invalid or expired reset token." });
  }
});

/*
GET USER BY ID (For Microservice Internal Communication)
*/
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("name email mobile isBlocked");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/*
GET WISHLIST
GET /api/auth/wishlist
*/
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user.wishlist || []);
  } catch (error) {
    res.status(500).json({ message: "Server error fetching wishlist" });
  }
});

/*
TOGGLE WISHLIST
POST /api/auth/wishlist/:propertyId
*/
router.post("/wishlist/:propertyId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { propertyId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    const isSaved = user.wishlist.includes(propertyId);

    if (isSaved) {
      // Remove it
      user.wishlist = user.wishlist.filter(id => id !== propertyId);
    } else {
      // Add it
      user.wishlist.push(propertyId);
    }

    await user.save();
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error updating wishlist" });
  }
});

/*
EXPLICIT REMOVE FROM WISHLIST (Used during checkout)
DELETE /api/auth/wishlist/:propertyId
*/
router.delete("/wishlist/:propertyId", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { propertyId } = req.params;

    if (!user) return res.status(404).json({ message: "User not found" });

    // Safely remove the ID if it exists
    user.wishlist = user.wishlist.filter(id => id !== propertyId);
    await user.save();
    
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error removing from wishlist" });
  }
});

module.exports = router;