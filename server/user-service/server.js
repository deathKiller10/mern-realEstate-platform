const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcryptjs"); // 👈 Added for password hashing
const User = require("./models/User"); // 👈 Added to access the User database
const connectDB = require("./config/db"); 

// Import specific routes for this service
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");

dotenv.config();

// Connect to DB and THEN seed the Admin user
connectDB().then(async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      await User.create({
        name: "Super Admin",
        mobile: "0000000000",
        email: "admin@realestate.com",
        password: hashedPassword,
        role: "admin",
      });
      console.log("✅ Default Admin Created -> Email: admin@realestate.com | Pass: admin123");
    } else {
      console.log(`⚡ Admin already exists in DB with email: ${adminExists.email}`);
    }
  } catch (error) {
    console.error("Failed to seed admin:", error);
  }
});

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 5001; // Port 5001 for User Service

app.listen(PORT, "0.0.0.0", () => {
  console.log(`User Service running on port ${PORT}`);
});