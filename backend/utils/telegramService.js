const axios = require("axios");

// Telegram Bot configuration
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}`;

/**
 * Send a message to Telegram
 * @param {string} message - The message to send
 * @returns {Promise<Object>} - Response from Telegram API
 */
async function sendTelegramMessage(message) {
  try {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error("Telegram bot token or chat ID not configured");
    }

    const response = await axios.post(`${TELEGRAM_API_URL}/sendMessage`, {
      chat_id: TELEGRAM_CHAT_ID,
      text: message,
      parse_mode: "HTML",
    });

    return response.data;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    throw error;
  }
}

/**
 * Send appointment notification to Telegram
 * @param {Object} appointmentData - Appointment data
 * @returns {Promise<Object>} - Response from Telegram API
 */
async function sendAppointmentNotification(appointmentData) {
  const petDetails = appointmentData.petDetails || {};
  const customerDetails = appointmentData.customerDetails || {};

  const message = `
🦮 <b>Nowa prośba o wizytę</b>

👤 <b>Klient:</b> ${appointmentData.customerName}
📧 <b>Email:</b> ${appointmentData.customerEmail}
📱 <b>Telefon:</b> ${customerDetails.phoneNumber || "Nie podano"}
🐕 <b>Imię Zwierzęcia:</b> ${appointmentData.petName}
🐕‍🦺 <b>Rasa:</b> ${petDetails.breed || "Nie określono"}
🐕 <b>Wiek:</b> ${petDetails.age || "Nie określono"}
💇‍♀️ <b>Usługa:</b> ${appointmentData.service}
📅 <b>Preferowane Dni:</b> ${customerDetails.preferredDays || "Nie określono"}
👥 <b>Typ Klienta:</b> ${customerDetails.customerType || "Nie określono"}

<b>Szczegóły Zwierzęcia:</b>
• Filcowanie: ${petDetails.matting || "Nie określono"}
• Komfort podczas pielęgnacji: ${petDetails.comfortable || "Nie określono"}
• Ostatnia pielęgnacja: ${petDetails.lastGroom || "Nie określono"}
• Problemy zdrowotne: ${petDetails.healthIssues || "Brak"}

📝 <b>Dodatkowe Uwagi:</b> ${customerDetails.notes || "Brak"}

🌐 <b>Język używany przez klienta:</b> ${appointmentData.language || "Nie określono"}
🕐 <b>Zgłoszono o:</b> ${new Date().toLocaleString("pl-PL")}
  `.trim();

  return await sendTelegramMessage(message);
}

module.exports = {
  sendTelegramMessage,
  sendAppointmentNotification,
};
