import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

class TokenService {
  transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;
  constructor() {
    this.transporter = nodemailer.createTransport({
      port: +process.env.EMAIL_PORT!,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD,
      },
      secure: false,
      host: process.env.EMAIL_HOST,
    });
  }
  async sendActivationMail(to: string, link: string) {
    await this.transporter.sendMail({
      from: process.env.EMAIL,
      to,
      subject: "Activate your Cloud Storage account",
      text: "",
      html: `
        <div>
            <h1>Activate your account</h1>
            <a href="${link}">${link}</a>
        </div>
        `,
    });
  }
}

export default new TokenService();
