const sgMail = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid configured');

const getLanguageDisplay = (lang) => {
  const languages = {
    'en': 'English',
    'pl': 'Polish',
    'ru': 'Russian',
    'ua': 'Ukrainian'
  };
  return languages[lang] || lang;
};

const loadTranslations = (language) => {
  try {
    const filePath = path.join(__dirname, `../locales/${language}/emails.json`);
    const rawData = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(rawData);
  } catch (error) {
    console.error(`Failed to load translations for ${language}, falling back to English`);
    const defaultPath = path.join(__dirname, '../locales/en/emails.json');
    const rawData = fs.readFileSync(defaultPath, 'utf8');
    return JSON.parse(rawData);
  }
};

const getCustomerEmailHtml = (appointmentData) => {
  // Load translations for customer's language
  const language = appointmentData.language?.toLowerCase()?.substring(0, 2) || 'en';
  const translations = loadTranslations(language);
  const t = translations.customerEmail;

  return `
  <!DOCTYPE html>
  <html lang="${language}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.subject}</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #f7f7f2;">
      <!-- Header with logo and teal background -->
      <div style="background-color: #17b5a6; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">BEST GROOM STUDIO</h1>
      </div>
      
      <!-- Main content -->
      <div style="padding: 40px 30px; background-color: #f7f7f2;">
        <div style="background-color: white; border-radius: 20px; padding: 30px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #17b5a6; margin-top: 0; margin-bottom: 20px; font-size: 22px;">
            ${t.thankYou}
          </h2>
          
          <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
            ${t.confirmationMessage.replace('{{customerName}}', appointmentData.customerName).replace('{{petName}}', appointmentData.petName)}
          </p>
          
          <p style="color: #333; font-size: 16px; line-height: 1.5; margin-top: 25px;">
            ${t.speedUpProcess}
          </p>
          
          <p style="color: #17b5a6; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0;">
            +48 574 516 116
          </p>
          
          <div style="margin-top: 30px; text-align: center;">
            <a href="https://bestgroomstudio.pl" style="background-color: #17b5a6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">
              ${t.visitWebsite}
            </a>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #17b5a6; padding: 20px; text-align: center;">
        <p style="color: white; margin: 0; font-size: 14px;">
          ${t.footer}
        </p>
      </div>
    </div>
  </body>
  </html>
`;
};

const getTeamEmailHtml = (appointmentData, serviceFormatted) => {
  // Always use Polish for team emails
  const translations = loadTranslations('pl');
  const t = translations.teamEmail;

  // Helper function to get value from nested or flat structure
  const getValue = (obj, directKey, nestedPath) => {
    // Try nested path first as it's the new structure
    if (nestedPath) {
      const [section, field] = nestedPath.split('.');
      if (obj[section]?.[field] !== undefined && obj[section][field] !== null) {
        return obj[section][field];
      }
    }
    // Fall back to direct access for backward compatibility
    if (obj[directKey] !== undefined && obj[directKey] !== null) {
      return obj[directKey];
    }
    return '';
  };

  return `
  <!DOCTYPE html>
  <html lang="pl">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${t.newRequest}</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #f7f7f2;">
      <!-- Header with logo and teal background -->
      <div style="background-color: #17b5a6; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">BEST GROOM STUDIO</h1>
      </div>
      
      <!-- Language Information -->
      <div style="padding: 10px 30px; background-color: #f0f8f7; text-align: center;">
        <p style="color: #17b5a6; margin: 0; font-size: 16px;">
          <strong>${t.languageInfo}:</strong> ${getLanguageDisplay(appointmentData.language || 'en')}
        </p>
      </div>
      
      <!-- Main content -->
      <div style="padding: 30px; background-color: #f7f7f2;">
        <div style="background-color: white; border-radius: 20px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #17b5a6; margin-top: 0; margin-bottom: 20px; font-size: 22px;">${t.newRequest}</h2>
          
          <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">${t.customerSection.heading}</h3>
            <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>${t.customerSection.fullName}:</strong> ${getValue(appointmentData, 'customerName', '')}</p>
            <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>${t.customerSection.email}:</strong> ${getValue(appointmentData, 'customerEmail', '')}</p>
          </div>
          
          <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">${t.petSection.heading}</h3>
            <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>${t.petSection.name}:</strong> ${getValue(appointmentData, 'petName', '')}</p>
            <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>${t.petSection.service}:</strong> ${serviceFormatted}</p>
            
            ${(() => {
              const breed = getValue(appointmentData, 'breed', 'petDetails.breed');
              const age = getValue(appointmentData, 'dogAge', 'petDetails.age');
              const matting = getValue(appointmentData, 'matting', 'petDetails.matting');
              const comfortGrooming = getValue(appointmentData, 'comfortable', 'petDetails.comfortable');
              const lastGroom = getValue(appointmentData, 'lastGroom', 'petDetails.lastGroom');
              const healthIssues = getValue(appointmentData, 'healthIssues', 'petDetails.healthIssues');
                            
              return `
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 10px; background-color: #f0f8f7; width: 50%;"><strong>${t.petSection.details.breed}:</strong> ${breed || t.petSection.details.notSpecified}</td>
                    <td style="padding: 6px 10px; background-color: #f0f8f7; width: 50%;"><strong>${t.petSection.details.age}:</strong> ${age || t.petSection.details.notSpecified}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 10px;"><strong>${t.petSection.details.matting}:</strong> ${matting || t.petSection.details.notSpecified}</td>
                    <td style="padding: 6px 10px;"><strong>${t.petSection.details.comfortGrooming}:</strong> ${comfortGrooming || t.petSection.details.notSpecified}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>${t.petSection.details.lastGroom}:</strong> ${lastGroom || t.petSection.details.notSpecified}</td>
                    <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>${t.petSection.details.healthIssues}:</strong> ${healthIssues || t.petSection.details.notSpecified}</td>
                  </tr>
                </table>
              `;
            })()}
          </div>
          
          <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">${t.appointmentSection.heading}</h3>
            <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>${t.appointmentSection.requestDate}:</strong> ${new Date(appointmentData.appointmentDate).toLocaleString('pl-PL')}</p>
          </div>
          
          <!-- Customer preferences section -->
          <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px; margin-top: 20px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">${t.preferencesSection.heading}</h3>
            
            ${(() => {
              const customerType = getValue(appointmentData, 'customerType', 'customerDetails.customerType');
              const phone = getValue(appointmentData, 'phoneNumber', 'customerDetails.phoneNumber');
              const preferredDays = getValue(appointmentData, 'preferredDays', 'customerDetails.preferredDays');
              
              return `
                <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
                  <tr>
                    <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>${t.preferencesSection.customerType}:</strong> ${customerType || t.petSection.details.notSpecified}</td>
                    <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>${t.preferencesSection.phone}:</strong> ${phone || t.petSection.details.notSpecified}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 10px;" colspan="2"><strong>${t.preferencesSection.preferredDays}:</strong> ${preferredDays || t.petSection.details.notSpecified}</td>
                  </tr>
                </table>
              `;
            })()}
          </div>
          
          <!-- Notes section -->
          <div style="margin-top: 20px; background-color: #f0f0f0; border-radius: 10px; padding: 15px;">
            <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">${t.notesSection.heading}</h3>
            <p style="color: #333; margin: 0; font-size: 14px;">${getValue(appointmentData, 'notes', 'customerDetails.notes') || t.notesSection.noNotes}</p>
          </div>
        </div>
      </div>
      
      <!-- Footer -->
      <div style="background-color: #17b5a6; padding: 15px; text-align: center;">
        <p style="color: white; margin: 0; font-size: 14px;">
          ${t.footer}
        </p>
      </div>
    </div>
  </body>
  </html>
`;
};

const sendAppointmentEmail = async (appointmentData) => {
  // Format the service name to be more readable
  const serviceFormatted = appointmentData.service
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());

  // Customer confirmation email - in customer's language
  const customerMsg = {
    to: appointmentData.customerEmail,
    from: 'team@bestgroomstudio.pl',
    subject: loadTranslations(appointmentData.language || 'en').customerEmail.subject,
    html: getCustomerEmailHtml(appointmentData)
  };
  
  // Team notification email - in Polish
  const teamMsg = {
    to: 'team@bestgroomstudio.pl',
    cc: 'bonuseto@gmail.com',
    from: 'team@bestgroomstudio.pl',
    subject: loadTranslations('pl').teamEmail.subject.replace('{{petName}}', appointmentData.petName).replace('{{service}}', serviceFormatted),
    html: getTeamEmailHtml(appointmentData, serviceFormatted)
  };
  
  try {
    // Send emails
    await sgMail.send(customerMsg);
    await sgMail.send(teamMsg);
  } catch (error) {
    console.error('Error sending emails:', error);
    throw error;
  }
};

module.exports = {
  sendAppointmentEmail
};