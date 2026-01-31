import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  try {
    const info = await transporter.sendMail({
      from: `"Carebow" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email error:", error);
    return { success: false, error };
  }
}

// Email Templates

export const emailTemplates = {
  verifyEmail: (name: string, verificationLink: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; }
        .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Carebow!</h1>
        </div>
        <div class="content">
          <h2>Hi ${name},</h2>
          <p>Thank you for joining Carebow - your trusted healthcare platform.</p>
          <p>Please verify your email address to get started:</p>
          <a href="${verificationLink}" class="button">Verify Email</a>
          <p>Or copy this link: ${verificationLink}</p>
          <p>This link will expire in 24 hours.</p>
        </div>
        <div class="footer">
          <p>© 2026 Carebow. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  bookingConfirmation: (familyName: string, caregiverName: string, date: string, time: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✅ Booking Confirmed!</h1>
        </div>
        <div class="content">
          <h2>Hi ${familyName},</h2>
          <p>Your booking has been confirmed!</p>
          <div class="booking-details">
            <div class="detail-row">
              <strong>Caregiver:</strong>
              <span>${caregiverName}</span>
            </div>
            <div class="detail-row">
              <strong>Date:</strong>
              <span>${date}</span>
            </div>
            <div class="detail-row">
              <strong>Time:</strong>
              <span>${time}</span>
            </div>
          </div>
          <p>You'll receive a reminder 24 hours before your appointment.</p>
        </div>
        <div class="footer">
          <p>© 2026 Carebow. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  bookingRequest: (caregiverName: string, familyName: string, date: string, service: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9fafb; padding: 30px; }
        .button { display: inline-block; padding: 15px 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 8px; font-weight: bold; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔔 New Booking Request</h1>
        </div>
        <div class="content">
          <h2>Hi ${caregiverName},</h2>
          <p>You have a new booking request!</p>
          <p><strong>Client:</strong> ${familyName}</p>
          <p><strong>Service:</strong> ${service}</p>
          <p><strong>Date:</strong> ${date}</p>
          <a href="${process.env.NEXT_PUBLIC_URL}/caregiver/bookings" class="button">View Request</a>
        </div>
      </div>
    </body>
    </html>
  `,
};
