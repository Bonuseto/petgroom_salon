const express = require('express');
const { createAppointment } = require('../controllers/emailController');

const router = express.Router();

router.post('/', createAppointment);

module.exports = router;