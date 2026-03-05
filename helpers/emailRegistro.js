import nodemailer from "nodemailer";

const emailRegistro = async (datos) => {
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
    subject: "Confirma tu cuenta en APV",
    text: "Confirma tu cuenta en APV",
    html: `<p>Hola: ${nombre} Comprueba tu cuenta en APV</p>
		<p>Tu cuenta ya está casi lista, solo debes comprobarla en el siguiente enlace:
		<a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar Cuenta</a></p>
		<p>Si tú no creaste esta cuenta, puedes ignorar este mensaje</p>`,
  });

  console.log("Mensaje enviado: %s", info.messageId);
};

export default emailRegistro;
