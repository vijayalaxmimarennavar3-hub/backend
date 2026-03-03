// src/services/registration.service.js

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/* Register for Event */
export const createRegistration = async (eventId, userId) => {
  return prisma.registration.create({
    data: {
      eventId,
      userId,
    },
  });
};

/* Get My Registrations */
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

/* Update Registration Status (Admin) */
export const updateRegistrationStatus = async (id, status) => {
  return prisma.registration.update({
    where: { id },
    data: { status },
    include: {
      user: true,
      event: true,
    },
  });
};

/* Get Event Registrations (Admin) */
export const getEventRegistrations = async (eventId) => {
  return prisma.registration.findMany({
    where: { eventId },
    include: {
      user: true,
    },
    orderBy: {
      timestamp: "desc",
    },
  });
};

/* Cancel Registration */
export const deleteRegistration = async (id, userId, role) => {
  // Adjust role check based on your Role enum
  if (role === "college_admin" || role === "super_admin") {
    return prisma.registration.delete({
      where: { id },
    });
  }

  return prisma.registration.deleteMany({
    where: {
      id,
      userId,
    },
  });
};