const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path"); // Needed to serve static files
const connectDB = require("./config/db"); 

// Import specific routes for this service
const propertyRoutes = require("./routes/propertyRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// VERY IMPORTANT: Serve the uploads folder statically so the frontend can load images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Mount the routes
app.use("/api/properties", propertyRoutes);

const PORT = process.env.PORT || 5002; // Port 5002 for Property Service

app.listen(PORT, () => {
  console.log(`Property Service running on port ${PORT}`);
});