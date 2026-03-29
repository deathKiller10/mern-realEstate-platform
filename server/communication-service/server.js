const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Import specific routes for this service
const inquiryRoutes = require("./routes/inquiryRoutes");
const messageRoutes = require("./routes/messageRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5003; // Port 5003 for Communication Service

app.listen(PORT, () => {
  console.log(`Communication Service running on port ${PORT}`);
});