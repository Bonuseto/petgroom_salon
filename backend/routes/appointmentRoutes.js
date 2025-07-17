// routes/appointmentRoutes.js
const express = require("express");
const router = express.Router();
const { sendAppointmentEmail } = require("../utils/emailService");
const { sendAppointmentNotification } = require("../utils/telegramService");

// POST route for creating a new appointment
router.post("/", async (req, res) => {
  try {
    const appointmentData = req.body;

    // Validate required fields
    if (
      !appointmentData.customerName ||
      !appointmentData.customerEmail ||
      !appointmentData.petName ||
      !appointmentData.service
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Send email notifications
    try {
      await sendAppointmentEmail(appointmentData);
      console.log("Appointment email sent successfully");
    } catch (emailError) {
      console.log("Failed to send email with appointment:", emailError);
    }

    // Send Telegram notification
    try {
      await sendAppointmentNotification(appointmentData);
      console.log("Telegram notification sent successfully");
    } catch (telegramError) {
      console.error("Failed to send Telegram notification:", telegramError);
    }

    return res.status(200).json({
      success: true,
      message: "Appointment request received successfully",
    });
  } catch (error) {
    console.error("Error processing appointment request:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
});

module.exports = router;
