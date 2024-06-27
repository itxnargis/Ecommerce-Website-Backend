const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        const transporter = nodeMailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true, // Use SSL/TLS
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD, // Use the app-specific password here
            }
        });

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
