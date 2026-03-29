const express = require("express");
const cors = require("cors");
const path = require("path");
const bcrypt = require("bcryptjs"); // Added for Admin seeding
const User = require("./models/User"); // Added for Admin seeding

const adminRoutes = require("./routes/adminRoutes");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const messageRoutes = require("./routes/messageRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB and then seed the Admin user
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

app.use(cors());
app.use(express.json());

// Expose the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/messages", messageRoutes);

app.get("/", (req, res) => {
  res.send("Real Estate API Running");
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});