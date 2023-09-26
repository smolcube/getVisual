
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


/*const nodemailer = require('nodemailer');
const asyncHandler = require('express-async-handler');

// @desc reusable send verification email
const sendEmail = asyncHandler(async (email, subject, text, res) => {
  const mailOptions = {
    from: 'getVisualMarket@gmail.com', // Your email address
    to: email, // Recipient's email address
    subject: subject, // Email subject
    text: text, // Email body
  };

  // Use Nodemailer to send the email
  // Include the reset link in the email
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
    console.log('Email sent at:' , new Date().toLocaleString().yellow);

    // Assuming the email was sent successfully, send a success response to the user
    res.status(200).json({ message: 'Password reset email sent successfully' });
    } 
    catch (error) {
    console.error('Error sending email:', error);

    // Handle specific email sending errors and provide a meaningful response
    if (error.code === 'ENOTFOUND') {
      res.status(500).json({ message: 'Email service provider not found' });
    } 
    else {
      res.status(500).json({ message: 'Email could not be sent' });
    }
  }
});

module.exports = {
  sendEmail,
};
*/