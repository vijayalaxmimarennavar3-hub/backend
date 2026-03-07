// src/routes/registration.routes.js

import express from "express";
import {
  registerForEvent,
  myRegistrations,
  cancelRegistration,
  updateStatus,
  getEventRegistrations,
} from "../controllers/registration.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";

const router = express.Router();

/* =========================
   Student Routes
   ========================= */

router.post("/", protect, registerForEvent);
router.get("/me", protect, myRegistrations);
router.delete("/:id", protect, cancelRegistration);

/* =========================
   Admin Routes
   ========================= */

router.patch(
  "/:id/status",
  protect,
  authorize("college_admin", "super_admin"),
  updateStatus
);

router.get(
  "/event/:eventId",
  protect,
  authorize("college_admin", "super_admin"),
  getEventRegistrations
);

export default router;