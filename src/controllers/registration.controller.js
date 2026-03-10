// src/controllers/registration.controller.js

import * as registrationService from "../services/registration.service.js";

/* Student Register */
export const registerForEvent = async (req, res) => {
  try {
    // Only students can register
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can register for events" });
    }

    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "Event ID is required" });
    }

    const registration = await registrationService.createRegistration(
      eventId,
      req.user
    );

    res.status(201).json({
      message: "Registration successful",
      registration,
    });
  } catch (error) {
    if (error.code === "P2002") {
      return res
        .status(400)
        .json({ message: "Already registered for this event" });
    }

    res.status(400).json({ message: error.message });
  }
};

/* Student: My Registrations */
export const myRegistrations = async (req, res) => {
  try {
    const registrations = await registrationService.getMyRegistrations(
      req.user.id
    );

    res.json({
      total: registrations.length,
      registrations,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/* Admin: Update Registration Status (Approve / Reject) */
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    //STATUS VALIDATION
  const allowedStatus = ["pending", "approved", "rejected"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value. Use pending, approved, or rejected.",
      });
    }

    const updated = await registrationService.updateRegistrationStatus(
      id,
      status,
      req.user
    );

    res.json({
      message: "Registration status updated",
      updated,
    });
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/* Admin: Get Event Registrations */
export const getEventRegistrations = async (req, res) => {
  try {
    const { eventId } = req.params;

    const result = await registrationService.getEventRegistrations(
      eventId,
      req.user
    );

    res.json(result);
  } catch (error) {
    res.status(403).json({ message: error.message });
  }
};

/* Cancel Registration */
export const cancelRegistration = async (req, res) => {
  try {
    // Only students should cancel
    if (req.user.role !== "student") {
      return res
        .status(403)
        .json({ message: "Only students can cancel registrations" });
    }

    const { id } = req.params;

    await registrationService.deleteRegistration(
      id,
      req.user.id,
      req.user.role
    );

    res.json({
      message: "Registration cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
