const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connectDB = require("./config/db");

// Import specific routes for this service
const inquiryRoutes = require("./routes/inquiryRoutes");
const messageRoutes = require("./routes/messageRoutes");

connectDB();

const { connectRabbitMQ } = require("./config/rabbitmq");
connectRabbitMQ();

const app = express();

app.use(cors());
app.use(express.json());

// Mount the routes
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/messages", messageRoutes);

const PORT = process.env.PORT || 5003; 

// 🚨 FIXED: Added "0.0.0.0" so Google Cloud can bind to it
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Communication Service running on port ${PORT}`);
});