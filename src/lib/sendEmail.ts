// // lib/sendEmail.ts
// import nodemailer from 'nodemailer';

// interface EmailOptions {
//   to: string;
//   subject: string;
//   text: string;
// }

// export default async function sendEmail({ to, subject, text }: EmailOptions) {
//   // Create a transporter using your email service credentials
//   const transporter = nodemailer.createTransport({
//     service: 'Gmail', // e.g., Gmail, or use SMTP settings
//     auth: {
//       user: process.env.EMAIL_USER, // Your email
//       pass: process.env.EMAIL_PASS, // Your email password or app password
//     },
//   });

//   // Send the email
//   await transporter.sendMail({
//     from: process.env.EMAIL_USER,
//     to,
//     subject,
//     text,
//   });
// }
