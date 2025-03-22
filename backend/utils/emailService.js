const nodemailer = require('nodemailer');

// Create a transporter based on environment variables
const createTransporter = () => {
  console.log('Email service:', process.env.EMAIL_SERVICE);
  console.log('Email user:', process.env.EMAIL_USER);
  console.log('Business email:', process.env.BUSINESS_EMAIL);
  
  // For Gmail
  if (process.env.EMAIL_SERVICE === 'gmail') {
    console.log('Using Gmail transport');
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }
  
  // For custom SMTP server
  console.log('Using custom SMTP transport');
  console.log('SMTP Host:', process.env.EMAIL_HOST || 'smtp.example.com');
  console.log('SMTP Port:', process.env.EMAIL_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.example.com',
    port: process.env.EMAIL_PORT || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
};

// Create the transporter here
let transporter;
try {
  transporter = createTransporter();
  console.log('Transporter created successfully');
} catch (error) {
  console.error('Error creating transporter:', error);
}

const sendAppointmentEmail = async (appointmentData) => {
  // Format the service name to be more readable
  const serviceFormatted = appointmentData.service
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.BUSINESS_EMAIL,
    subject: 'New Grooming Appointment Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e4e4e4; border-radius: 5px;">
        <h2 style="color: #4d5937; text-align: center; margin-bottom: 20px;">New Appointment Request</h2>
        <div style="margin-bottom: 15px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Customer Information:</p>
          <p style="margin: 0 0 5px 10px;"><strong>Name:</strong> ${appointmentData.customerName}</p>
          <p style="margin: 0 0 5px 10px;"><strong>Email:</strong> ${appointmentData.customerEmail}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Pet Information:</p>
          <p style="margin: 0 0 5px 10px;"><strong>Pet Name:</strong> ${appointmentData.petName}</p>
          <p style="margin: 0 0 5px 10px;"><strong>Service Requested:</strong> ${serviceFormatted}</p>
        </div>
        <div style="margin-bottom: 15px;">
          <p style="font-weight: bold; margin-bottom: 5px;">Appointment Details:</p>
          <p style="margin: 0 0 5px 10px;"><strong>Date Requested:</strong> ${new Date(appointmentData.appointmentDate).toLocaleString()}</p>
        </div>
        <div style="margin-top: 20px; padding: 10px; background-color: #f9f9f9; border-left: 4px solid #4d5937;">
          <p style="font-weight: bold; margin-bottom: 5px;">Additional Notes:</p>
          <p style="white-space: pre-line; margin: 0;">${appointmentData.additionalNotes || 'None'}</p>
        </div>
      </div>
    `
  };

  try {
    console.log('Attempting to send email to:', process.env.BUSINESS_EMAIL);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = {
  sendAppointmentEmail
};