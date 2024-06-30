const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
        console.log("Creating transporter");
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD,
            },
        });
        console.log("Creating transporter success");

        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message,
        };
        console.log(`Sending message to ${options.email} `)

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully")
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error('Email could not be sent');
    }
};

module.exports = sendEmail;
