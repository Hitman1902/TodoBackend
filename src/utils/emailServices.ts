import nodemailer, { Transporter, SendMailOptions } from "nodemailer";

const transporter: Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export const sendOTPEmail = (email: string, otp: number): Promise<any> => {
  const mailOptions: SendMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Password change OTP",
    text: `YOUR OTP FOR RESETTING PASSWORD IS: ${otp}`,
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};
