const nodemailer = require('nodemailer');

/**
 * Send an email using configured SMTP.
 * Environment variables supported:
 * - EMAIL_SERVICE (optional, e.g. 'gmail')
 * - EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE (optional when using host)
 * - EMAIL_USER (required)
 * - EMAIL_PASS (required)
 * - EMAIL_FROM (optional)
 */
const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    throw new Error('EMAIL_USER and EMAIL_PASS must be set in environment to send emails');
  }

  if (process.env.EMAIL_SERVICE && process.env.EMAIL_SERVICE.toLowerCase() === 'gmail') {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  }

  // Fallback to generic SMTP settings
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = process.env.EMAIL_PORT ? parseInt(process.env.EMAIL_PORT, 10) : 587;
  const secure = process.env.EMAIL_SECURE === 'true';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = createTransporter();

  const from = process.env.EMAIL_FROM || process.env.EMAIL_USER;

  const info = await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html
  });

  return info;
};

module.exports = sendEmail;
