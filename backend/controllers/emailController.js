const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
console.log('SendGrid configured');

const sendAppointmentEmail = async (appointmentData) => {
  // Format the service name to be more readable
  const serviceFormatted = appointmentData.service
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
  
  // Customer confirmation email - beautiful and simple
  const customerEmailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
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
            <h2 style="color: #17b5a6; margin-top: 0; margin-bottom: 20px; font-size: 22px;">Thank You For Your Appointment Request</h2>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-bottom: 25px;">
              ${appointmentData.customerName}, thank you for your appointment request for ${appointmentData.petName}. We will contact you shortly to schedule an appointment time.
            </p>
            
            <p style="color: #333; font-size: 16px; line-height: 1.5; margin-top: 25px;">
              If you would like to speed up the process, you can contact us by calling:
            </p>
            
            <p style="color: #17b5a6; font-size: 18px; font-weight: bold; text-align: center; margin: 20px 0;">
              +420 776 406 043
            </p>
            
            <div style="margin-top: 30px; text-align: center;">
              <a href="https://bestgroomstudio.com" style="background-color: #17b5a6; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block;">Visit Our Website</a>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #17b5a6; padding: 20px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 14px;">
            Pet grooming with heart - Bringing out the best in every Wroclaw pet
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
  
  // Team notification email - detailed with all appointment information
  const teamEmailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Appointment Request</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #f7f7f2;">
        <!-- Header with logo and teal background -->
        <div style="background-color: #17b5a6; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 24px;">BEST GROOM STUDIO</h1>
        </div>
        
        <!-- Main content -->
        <div style="padding: 30px; background-color: #f7f7f2;">
          <div style="background-color: white; border-radius: 20px; padding: 25px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #17b5a6; margin-top: 0; margin-bottom: 20px; font-size: 22px;">New Appointment Request</h2>
            
            <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Customer Information</h3>
              <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>Name:</strong> ${appointmentData.customerName}</p>
              <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>Email:</strong> ${appointmentData.customerEmail}</p>
            </div>
            
            <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Pet Information</h3>
              <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>Pet Name:</strong> ${appointmentData.petName}</p>
              <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>Service Requested:</strong> ${serviceFormatted}</p>
              
              <!-- Use direct fields if available, otherwise try to parse from additionalNotes -->
              ${(() => {
                // Initialize variables
                let breed = '';
                let age = '';
                let matting = '';
                let comfortGrooming = '';
                let lastGroom = '';
                let healthIssues = '';
                
                // Use structured fields if available
                if (appointmentData.petDetails) {
                  breed = appointmentData.petDetails.breed || '';
                  age = appointmentData.petDetails.age || '';
                  matting = appointmentData.petDetails.matting || '';
                  comfortGrooming = appointmentData.petDetails.comfortable || '';
                  lastGroom = appointmentData.petDetails.lastGroom || '';
                  healthIssues = appointmentData.petDetails.healthIssues || '';
                } 
                // Fall back to parsing from additionalNotes
                else if (appointmentData.additionalNotes) {
                  const notes = appointmentData.additionalNotes;
                  
                  const breedMatch = notes.match(/Breed:\s*([^\n]+)/);
                  const ageMatch = notes.match(/Age:\s*([^\n]+)/);
                  const mattingMatch = notes.match(/Matting:\s*([^\n]+)/);
                  const comfortMatch = notes.match(/Comfortable being groomed:\s*([^\n]+)/);
                  const lastGroomMatch = notes.match(/Last groom:\s*([^\n]+)/);
                  const healthMatch = notes.match(/Health issues:\s*([^\n]+)/);
                  
                  breed = breedMatch ? breedMatch[1].trim() : '';
                  age = ageMatch ? ageMatch[1].trim() : '';
                  matting = mattingMatch ? mattingMatch[1].trim() : '';
                  comfortGrooming = comfortMatch ? comfortMatch[1].trim() : '';
                  lastGroom = lastGroomMatch ? lastGroomMatch[1].trim() : '';
                  healthIssues = healthMatch ? healthMatch[1].trim() : '';
                }
                
                // Generate HTML table with pet details
                return `
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 10px; background-color: #f0f8f7; width: 50%;"><strong>Breed:</strong> ${breed || 'Not specified'}</td>
                      <td style="padding: 6px 10px; background-color: #f0f8f7; width: 50%;"><strong>Age:</strong> ${age || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 10px;"><strong>Matting:</strong> ${matting || 'Not specified'}</td>
                      <td style="padding: 6px 10px;"><strong>Comfortable with grooming:</strong> ${comfortGrooming || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>Last groom:</strong> ${lastGroom || 'Not specified'}</td>
                      <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>Health issues:</strong> ${healthIssues || 'Not specified'}</td>
                    </tr>
                  </table>
                `;
              })()}
            </div>
            
            <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Appointment Details</h3>
              <p style="color: #333; margin: 5px 0; font-size: 16px;"><strong>Date Requested:</strong> ${new Date(appointmentData.appointmentDate).toLocaleString()}</p>
            </div>
            
            <!-- Customer preferences section -->
            <div style="margin-bottom: 20px; border-left: 4px solid #17b5a6; padding-left: 15px; margin-top: 20px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Customer Preferences</h3>
              
              ${(() => {
                // Initialize variables
                let customerType = '';
                let phone = '';
                let preferredDays = '';
                
                // Use structured fields if available
                if (appointmentData.customerDetails) {
                  customerType = appointmentData.customerDetails.customerType || '';
                  phone = appointmentData.customerDetails.phoneNumber || '';
                  preferredDays = appointmentData.customerDetails.preferredDays || '';
                }
                // Fall back to parsing from additionalNotes
                else if (appointmentData.additionalNotes) {
                  const notes = appointmentData.additionalNotes;
                  
                  const customerTypeMatch = notes.match(/Customer type:\s*([^\n]+)/);
                  const phoneMatch = notes.match(/Phone:\s*([^\n]+)/);
                  const preferredDaysMatch = notes.match(/Preferred days:\s*([^\n]+)/);
                  
                  customerType = customerTypeMatch ? customerTypeMatch[1].trim() : '';
                  phone = phoneMatch ? phoneMatch[1].trim() : '';
                  preferredDays = preferredDaysMatch ? preferredDaysMatch[1].trim() : '';
                }
                
                // Generate HTML for customer preferences
                return `
                  <table style="width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
                    <tr>
                      <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>Customer type:</strong> ${customerType || 'Not specified'}</td>
                      <td style="padding: 6px 10px; background-color: #f0f8f7;"><strong>Phone:</strong> ${phone || 'Not specified'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 6px 10px;" colspan="2"><strong>Preferred days:</strong> ${preferredDays || 'Not specified'}</td>
                    </tr>
                  </table>
                `;
              })()}
            </div>
            
            <!-- Notes section -->
            <div style="margin-top: 20px; background-color: #f0f0f0; border-radius: 10px; padding: 15px;">
              <h3 style="color: #333; margin-top: 0; margin-bottom: 10px; font-size: 18px;">Additional Notes</h3>
              <p style="color: #333; margin: 0; font-size: 14px;">
                ${appointmentData.customerDetails?.notes || (appointmentData.additionalNotes ? appointmentData.additionalNotes.match(/Notes:\s*([^\n]+)/) ? appointmentData.additionalNotes.match(/Notes:\s*([^\n]+)/)[1].trim() : 'None' : 'None')}
              </p>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background-color: #17b5a6; padding: 15px; text-align: center;">
          <p style="color: white; margin: 0; font-size: 14px;">
            Internal Team Notification
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    // Send customer confirmation email
    console.log('Sending customer confirmation email to:', appointmentData.customerEmail);
    const customerMsg = {
      to: appointmentData.customerEmail,
      from: 'team@bestgroomstudio.pl',
      subject: 'Thank You For Your Appointment Request - Best Groom Studio',
      html: customerEmailHtml
    };
    const customerResponse = await sgMail.send(customerMsg);
    console.log('Customer email sent. Status code:', customerResponse[0].statusCode);
    
    // Send team notification email
    console.log('Sending team notification email to: team@bestgroomstudio.pl');
    const teamMsg = {
      to: 'team@bestgroomstudio.pl',
      cc: 'bonuseto@gmail.com',
      from: 'team@bestgroomstudio.pl',
      subject: `New Appointment: ${appointmentData.petName} - ${serviceFormatted}`,
      html: teamEmailHtml
    };
    const teamResponse = await sgMail.send(teamMsg);
    console.log('Team email sent. Status code:', teamResponse[0].statusCode);
    
    return { customerResponse, teamResponse };
  } catch (error) {
    console.error('Error sending email with SendGrid:', error);
    if (error.response) {
      console.error('SendGrid API error details:', error.response.body);
    }
    throw error;
  }
};

module.exports = {
  sendAppointmentEmail
};