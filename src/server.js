import express from "express";
import {
  registerForEvent,
  myRegistrations,
  cancelRegistration,
  updateStatus,
  getEventRegistrations,
} from "../controllers/registration.controller.js";

import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Student Routes */
router.post("/", protect, registerForEvent);
router.get("/me", protect, myRegistrations);
router.delete("/:id", protect, cancelRegistration);

/* Admin Routes */
router.patch("/:id/status", protect, admin, updateStatus);
router.get("/event/:eventId", protect, admin, getEventRegistrations);

export default router;