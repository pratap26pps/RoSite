import nodemailer from "nodemailer";

export const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      secure: false, 
    auth: {
      user: process.env.MAIL_AUTH,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: '"RO TECX" <no-reply@rotecx.com>',
    to: email,
    subject: "Verify your email",
    html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
  });
};
