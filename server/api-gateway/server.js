const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(cors());

// THE FIX: This helper function stops Express from stripping the base path!
// It forces the proxy to forward the exact, original URL (including queries).
const preservePath = (path, req) => req.originalUrl;

// --- 1. Route to User Service (Port 5001) ---
app.use("/api/auth", createProxyMiddleware({ 
  target: "http://localhost:5001", 
  changeOrigin: true,
  pathRewrite: preservePath 
}));
app.use("/api/admin", createProxyMiddleware({ 
  target: "http://localhost:5001", 
  changeOrigin: true,
  pathRewrite: preservePath 
}));

// --- 2. Route to Property Service (Port 5002) ---
app.use("/api/properties", createProxyMiddleware({ 
  target: "http://localhost:5002", 
  changeOrigin: true,
  pathRewrite: preservePath 
}));
// Don't forget to forward image requests so the frontend can display them!
app.use("/uploads", createProxyMiddleware({ 
  target: "http://localhost:5002", 
  changeOrigin: true,
  //pathRewrite: preservePath 
}));

// --- 3. Route to Communication Service (Port 5003) ---
app.use("/api/inquiries", createProxyMiddleware({ 
  target: "http://localhost:5003", 
  changeOrigin: true,
  pathRewrite: preservePath 
}));
app.use("/api/messages", createProxyMiddleware({ 
  target: "http://localhost:5003", 
  changeOrigin: true,
  pathRewrite: preservePath 
}));
// --- 4. Payment Service (Port 5004) ---
// UPDATED: Now using createProxyMiddleware for consistency
app.use("/api/payment", createProxyMiddleware({ 
  target: "http://localhost:5004", 
  changeOrigin: true,
  pathRewrite: (path) => path.replace(/^\/api\/payment/, "") 
  // 💡 Note: We replace the prefix because your Payment server.js 
  // is likely listening for "/create-intent" directly.
}));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚦 API Gateway running on http://localhost:${PORT}`);
  console.log(`   -> Paths are strictly preserved for microservice routing.`);
});