const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, phone, email, brokerage, package: pkg, propertyType, address, date, message } = req.body;

    // Create transporter using Gmail
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Email to you (the business owner)
    const ownerEmail = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `New Booking Request from ${name}`,
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Brokerage:</strong> ${brokerage || 'N/A'}</p>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Property Type:</strong> ${propertyType}</p>
        <p><strong>Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${date || 'N/A'}</p>
        <p><strong>Message:</strong> ${message || 'N/A'}</p>
      `,
    };

    // Confirmation email to client
    const clientEmail = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Thank you for your inquiry - SkyShot Aerial',
      html: `
        <h2>Thanks for your inquiry!</h2>
        <p>Hi ${name},</p>
        <p>We've received your booking request and will respond with a quote within 2 hours during business hours.</p>

        <h3>Your Request Details:</h3>
        <p><strong>Package:</strong> ${pkg}</p>
        <p><strong>Property Type:</strong> ${propertyType}</p>
        <p><strong>Property Address:</strong> ${address || 'N/A'}</p>
        <p><strong>Preferred Date:</strong> ${date || 'N/A'}</p>

        <p>If you have any urgent questions, feel free to call or text us at (610) 299-1078.</p>

        <p>Best regards,<br>
        SkyShot Aerial<br>
        (610) 299-1078<br>
        zackyonker@gmail.com</p>
      `,
    };

    // Send both emails
    await transporter.sendMail(ownerEmail);
    await transporter.sendMail(clientEmail);

    return res.status(200).json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
};
