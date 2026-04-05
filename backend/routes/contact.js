const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');

// Create transporter lazily so missing env vars don't crash startup
function getTransporter() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

// POST /api/contact — public
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // 1. Save to MongoDB
    const contact = new Contact({ name, email, subject, message });
    await contact.save();

    // 2. Send email notification (non-blocking — won't fail the response)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS &&
        process.env.EMAIL_USER !== 'your_gmail@gmail.com') {
      try {
        const transporter = getTransporter();
        await transporter.sendMail({
          from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `[Portfolio] ${subject}`,
          html: `
            <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #F8F5F2; border-radius: 12px;">
              <h2 style="color: #800020; margin-bottom: 4px;">New Contact Message</h2>
              <p style="color: #8C6B5E; font-size: 14px; margin-bottom: 24px;">Received via your portfolio contact form</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #5A3E35; font-weight: bold; width: 80px;">Name</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #2D1B14;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #5A3E35; font-weight: bold;">Email</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #2D1B14;"><a href="mailto:${email}" style="color: #800020;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #5A3E35; font-weight: bold;">Subject</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #F0EAE2; font-size: 13px; color: #2D1B14;">${subject}</td>
                </tr>
              </table>
              <div style="margin-top: 20px; padding: 16px; background: white; border-radius: 8px; border-left: 3px solid #C9A227;">
                <p style="font-size: 13px; color: #5A3E35; font-weight: bold; margin-bottom: 8px;">Message</p>
                <p style="font-size: 14px; color: #2D1B14; line-height: 1.6; margin: 0;">${message.replace(/\n/g, '<br/>')}</p>
              </div>
              <p style="margin-top: 24px; font-size: 12px; color: #A0785A;">You can reply directly to this email to respond to ${name}.</p>
            </div>
          `,
        });
      } catch (emailErr) {
        // Log but don't fail — message is already saved to DB
        console.error('Email send failed:', emailErr.message);
      }
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET all messages — for future admin use
router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
