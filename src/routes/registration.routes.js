// src/routes/registration.routes.js

import express from "express";
<<<<<<< HEAD
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
=======
import * as registrationController from "../controllers/registration.controller.js";

import { protect, authorize } from "../middlewares/auth.middleware.js";
import { optionalProtect } from "../middlewares/optionalAuth.middleware.js";


const router = express.Router();

/* Student Routes */
router.post("/", protect, registrationController.registerForEvent);
router.get("/me", protect, registrationController.myRegistrations);

router.delete("/:id", protect, registrationController.cancelRegistration);

/* Admin Routes */
router.patch("/status/:id", protect, authorize("college_admin", "super_admin"), registrationController.updateStatus);
router.get("/event/:eventId", protect, authorize("college_admin", "super_admin"), registrationController.getEventRegistrations);
>>>>>>> b5812da1e8daa2055d98baae5e883cb99ca3ebf8

export default router;

  
