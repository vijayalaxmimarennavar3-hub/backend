import express from "express";
import * as registrationController from "../controllers/registration.controller.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

/* Student Routes */
router.post("/", protect, registrationController.registerForEvent);
router.get("/me", protect, registrationController.myRegistrations);
router.delete("/:id", protect, registrationController.cancelRegistration);

/* Admin Routes */
router.patch("/:id/status", protect, admin, registrationController.updateStatus);
router.get("/event/:eventId", protect, admin, registrationController.getEventRegistrations);

export default router;