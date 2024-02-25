
const nodemailer = require('nodemailer');

// @desc reusable send verification email
const sendEmail = async (email, subject, text) => {
  const mailOptions = {
    from: 'getVisualMarket@gmail.com', // Your email address
    to: email, // Recipient's email address
    subject: subject, // Email subject
    text: text, // Email body
  };

  // Use Nodemailer to send the email
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SERIVCE_EMAIL, // Your email address
      pass: process.env.SERIVCE_PASS, // Your email password
    },
  });

  try {
    // Send the email using the defined mailOptions
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response.yellow);
    console.log('Email sent at:', new Date().toLocaleString().yellow);

    // Return a success message
    return { success: true, message: 'Password reset email sent successfully' };
  } catch (error) {
    console.error('Error sending email:', error);

    // Handle specific email sending errors and provide a meaningful response
    if (error.code === 'ENOTFOUND') {
      return { success: false, message: 'Email service provider not found' };
    } else {
      return { success: false, message: 'Email could not be sent' };
    }
  }
};

module.exports = {
  sendEmail,
};

