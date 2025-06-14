const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // Or your preferred email service
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendWelcomeEmail(to, username) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: 'Welcome to Our Website!',
        html: `<h1>Hi ${username},</h1><p>Welcome to our platform! We're excited to have you.</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`Welcome email sent to ${to}`);
    } catch (error) {
        console.error('Error sending welcome email:', error);
    }
}

module.exports = sendWelcomeEmail;