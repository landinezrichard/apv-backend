import nodemailer from "nodemailer";

const emailOlvidePassword = async (datos) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Enviar email
  const { email, nombre, token } = datos;

  const info = await transporter.sendMail({
    from: "APV - Administrador de Pacientes de Veterinaria",
    to: email,
    subject: "Reestablece tu password en APV",
    text: "Reestablece tu password en APV",
    html: `<p>Hola: ${nombre}, has solicitado reestablecer tu password</p>
		<p>Sigue el siguiente enlace para generar un nuevo password
		<a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer Password</a></p>
		<p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>`,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailOlvidePassword;
