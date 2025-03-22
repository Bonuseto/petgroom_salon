// Load environment variables first
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointmentRoutes');

// Log environment variables for debugging
console.log('Server starting with:');
console.log('PORT:', process.env.PORT);
console.log('EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('EMAIL_USER exists:', !!process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
console.log('BUSINESS_EMAIL:', process.env.BUSINESS_EMAIL);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});