import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { name, email, phone, message } = await request.json();

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // https://myaccount.google.com/apppasswords (use App Passwords for Gmail)
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: "aksamitnaeteryka@gmail.com",
      subject: "Nowa wiadomość z formularza kontaktowego",
      text: `
        Imię i nazwisko: ${name}
        Email: ${email}
        Telefon: ${phone}

        Wiadomość:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: "Wiadomość wysłana" }), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Błąd podczas wysyłania" }), {
      status: 500,
    });
  }
}
