const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config(); // Ensure access to environment variables

router.post('/send-mail', async (req, res) => {
  const { name, phone, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    // auth: {
    //   user: process.env.EMAIL,
    //   pass: process.env.PASSWORD,
    // },
  });

  const mailOptions = {
    from: email,
    to: 'bharathipriyaramakrishnan@gmail.com',
    subject: `Message from ${name}`,
    text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

module.exports = router;
