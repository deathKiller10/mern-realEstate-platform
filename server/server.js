const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {

  res.send("Real Estate API Running");

});

const authMiddleware = require("./middleware/authMiddleware");

// app.get("/api/test", authMiddleware, (req, res) => {
//   res.json({
//     message: "Protected route accessed",
//     user: req.user
//   });
// });

app.listen(PORT, () => {

  console.log("Server running on port", PORT);

});