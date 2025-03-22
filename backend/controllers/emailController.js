const { sendAppointmentEmail } = require('../utils/emailService');

const createAppointment = async (req, res) => {
  try {
    await sendAppointmentEmail(req.body);
    
    res.status(200).json({
      success: true,
      message: 'Appointment request sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send appointment request'
    });
  }
};

module.exports = {
  createAppointment
};