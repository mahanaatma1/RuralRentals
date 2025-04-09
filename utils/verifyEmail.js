const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER, //  Gmail address
        pass: process.env.APP_PASSWORD // App password 
    },
});

const sendVerificationEmail = async(email, verificationLink) => {
    try {
        const mailOptions = {
            to: email,
            from: `"RuralRentals" <${process.env.EMAIL_USER}>`,
            subject: 'Verify Your RuralRentals Account',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9; color: #333; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
                    <div style="text-align: center; padding: 20px 0;">
                        <h1 style="color: #4CAF50; margin-bottom: 10px;">Welcome to RuralRentals</h1>
                        <p style="font-size: 16px; color: #555;">Your gateway to amazing travel experiences awaits!</p>
                    </div>
                    <div style="padding: 20px; text-align: center;">
                        <p style="font-size: 16px; line-height: 1.6; color: #333;">
                            Thank you for signing up! To complete your registration, please verify your email by clicking the button below:
                        </p>
                        <a href="${verificationLink}" style="display: inline-block; margin: 20px 0; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px; font-weight: bold;">Verify My Email</a>
                        <p style="font-size: 14px; color: #777; margin-top: 20px;">
                            This link will expire in 1 hour. If you did not create an account, please ignore this email.
                        </p>
                    </div>
                    <div style="text-align: center; margin-top: 20px; font-size: 14px; color: #999;">
                        <p>&copy; ${new Date().getFullYear()} RuralRentals. All rights reserved.</p>
                        <p>
                            Need help? Contact us at 
                            <a href="mailto:ruralrentals.in@gmail.com" style="color: #4CAF50; text-decoration: none;">ruralrentals.in@gmail.com</a>
                        </p>
                    </div>
                </div>
            `
        };

        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending verification email:', error);
        throw new Error('Failed to send verification email');
    }
};

module.exports = { sendVerificationEmail }