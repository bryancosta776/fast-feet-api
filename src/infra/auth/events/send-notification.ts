import { shipmentRole } from "@prisma/client";
import * as nodemailer from "nodemailer";

export async function sendNotification(email: string, status: shipmentRole) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // ou outro serviço
    auth: {
      user: "seu-email@gmail.com",
      pass: "sua-senha",
    },
  });

  const mailOptions = {
    from: "seu-email@gmail.com",
    to: email,
    subject: "Atualização da Remessa",
    text: `O status da sua remessa foi atualizado para: ${status}`,
  };

  await transporter.sendMail(mailOptions);
}
