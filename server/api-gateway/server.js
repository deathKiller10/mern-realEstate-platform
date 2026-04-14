const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 20 requests per 15 minutes
  message: { 
    message: "Too many requests from this IP. Please try again in 15 minutes." 
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

app.use("/api", apiLimiter);

const preservePath = (path, req) => req.originalUrl;

// --- 1. Route to User Service ---
app.use("/api/auth", createProxyMiddleware({ 
  target: process.env.USER_SERVICE_URL, // 👈 Now dynamic!
  changeOrigin: true,
  pathRewrite: preservePath 
}));
app.use("/api/admin", createProxyMiddleware({ 
  target: process.env.USER_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: preservePath 
}));

// --- 2. Route to Property Service ---
app.use("/api/properties", createProxyMiddleware({ 
  target: process.env.PROPERTY_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: preservePath 
}));

// --- 3. Route to Communication Service ---
app.use("/api/inquiries", createProxyMiddleware({ 
  target: process.env.COMMUNICATION_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: preservePath 
}));
app.use("/api/messages", createProxyMiddleware({ 
  target: process.env.COMMUNICATION_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: preservePath 
}));

// --- 4. Route to Payment Service ---
app.use("/api/payment", createProxyMiddleware({ 
  target: process.env.PAYMENT_SERVICE_URL, 
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/payment/, "") 
}));

const PORT = process.env.PORT || 5000;

// 🚨 FIXED: Added "0.0.0.0" so Google Cloud can bind to it
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚦 API Gateway running on port ${PORT}`);
  console.log(`   -> Traffic routing to Live Cloud Run Services.`);
});