// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

/* Route Imports */
import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import registrationRoutes from "./routes/registration.routes.js";

/* Load Environment Variables */
dotenv.config();

const app = express();

/* ================================
   Middleware
================================ */

app.use(cors());
app.use(express.json());

/* ================================
   API Routes
================================ */

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

/* ================================
   Root Route
================================ */

app.get("/", (req, res) => {
  res.send(" Event Management API Running...");
});

/* ================================
   404 Handler
================================ */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ================================
   Global Error Handler
================================ */

app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

/* ================================
   Server Start
================================ */
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js"
import collegeRoutes from "./routes/college.routes.js";
import registrationRoutes from "./routes/registration.routes.js"


const app = express();

app.use(
  cors()
);

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ status: "OK ALL WORKING FINE" });
});

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/colleges", collegeRoutes);
app.use("/api/register", registrationRoutes);
>>>>>>> b5812da1e8daa2055d98baae5e883cb99ca3ebf8

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`Server running on port ${PORT}`);
});
