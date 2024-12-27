import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());

// API routes
app.use("/api/products", productRoutes);

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(); // Ensure __dirname works with ES modules
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server started at http://localhost:${PORT}`);
});
