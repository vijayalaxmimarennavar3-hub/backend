// src/services/registration.service.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* ==============================
   Student Register for Event
================================ */
export const createRegistration = async (eventId, user) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  /* Only students can register */
  if (user.role !== "student") {
    throw new Error("Only students can register for events");
  }

  /* Student can register only for:
     - their college events
     - global events
  */
  if (
    event.scope === "college" &&
    event.collegeId !== user.collegeId
  ) {
    throw new Error(
      "You can register only for events hosted by your college"
    );
  }

  /* Prevent duplicate registration */
  const existing = await prisma.registration.findFirst({
    where: {
      eventId,
      userId: user.id,
    },
  });

  if (existing) {
    throw new Error("Already registered for this event");
  }

  return prisma.registration.create({
    data: {
      eventId,
      userId: user.id,
    },
  });
};


/* ==============================
   Student: View My Registrations
================================ */
export const getMyRegistrations = async (userId) => {
  return prisma.registration.findMany({
    where: { userId },
    include: {
      event: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
};


/* ==============================
   Admin: Approve / Reject
================================ */
export const updateRegistrationStatus = async (id, status, user) => {
  const registration = await prisma.registration.findUnique({
    where: { id },
    include: {
      event: true,
    },
  });

  if (!registration) {
    throw new Error("Registration not found");
  }

  /* College Admin → only their college events */
  if (user.role === "college_admin") {
    if (registration.event.collegeId !== user.collegeId) {
      throw new Error(
        "You can manage only events from your college"
      );
    }
  }

  /* Super Admin → only events they created */
  if (user.role === "super_admin") {
    if (registration.event.createdBy !== user.id) {
      throw new Error(
        "You can manage only events created by you"
      );
    }
  }

  return prisma.registration.update({
    where: { id },
    data: { status },
  });
};


/* ==============================
   Admin: View Event Participants
================================ */
export const getEventRegistrations = async (eventId, user) => {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    throw new Error("Event not found");
  }

  /* College Admin restriction */
  if (user.role === "college_admin") {
    if (event.collegeId !== user.collegeId) {
      throw new Error("Access denied");
    }
  }

  /* Super Admin restriction */
  if (user.role === "super_admin") {
    if (event.createdBy !== user.id) {
      throw new Error("Access denied");
    }
  }

  const registrations = await prisma.registration.findMany({
    where: { eventId },
    include: {
      user: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });

  return {
    totalParticipants: registrations.length,
    participants: registrations,
  };
};


/* ==============================
   Cancel Registration
================================ */
export const deleteRegistration = async (id, userId, role) => {

  /* Only students cancel their own registrations */
  if (role !== "student") {
    throw new Error("Only students can cancel registrations");
  }

  return prisma.registration.deleteMany({
    where: {
      id,
      userId,
    },
  });
};