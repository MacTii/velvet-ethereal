import nodemailer from "nodemailer";
import { StatusCodes } from "http-status-codes";

const LIMITS = { name: 100, email: 254, phone: 30, message: 5000 };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Usuwa znaki nowej linii - bez tego tresc pola trafia do naglowkow maila
const singleLine = (value) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

export async function POST(request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return json({ error: "Nieprawidłowe dane formularza." }, StatusCodes.BAD_REQUEST);
    }

    const name = singleLine(body.name);
    const email = singleLine(body.email);
    const phone = singleLine(body.phone);
    const message = String(body.message ?? "").trim();

    if (!name || !email || !message) {
      return json(
        { error: "Imię, email i wiadomość są wymagane." },
        StatusCodes.BAD_REQUEST
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return json({ error: "Podaj poprawny adres email." }, StatusCodes.BAD_REQUEST);
    }

    const tooLong = Object.entries(LIMITS).some(
      ([field, max]) => ({ name, email, phone, message })[field].length > max
    );

    if (tooLong) {
      return json({ error: "Wiadomość jest zbyt długa." }, StatusCodes.BAD_REQUEST);
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS, // https://myaccount.google.com/apppasswords (use App Passwords for Gmail)
      },
    });

    // Nadawca to zawsze wlasna skrzynka - adres z formularza idzie w replyTo,
    // inaczej Gmail odrzuca maila jako podszywanie sie pod cudza domene.
    await transporter.sendMail({
      from: `"Formularz Aksamitna Eteryka" <${process.env.MAIL_USER}>`,
      replyTo: `"${name}" <${email}>`,
      to: "aksamitnaeteryka@gmail.com",
      subject: "Nowa wiadomość z formularza kontaktowego",
      text: [
        `Imię i nazwisko: ${name}`,
        `Email: ${email}`,
        `Telefon: ${phone || "-"}`,
        "",
        "Wiadomość:",
        message,
      ].join("\n"),
    });

    return json({ message: "Wiadomość została wysłana!" }, StatusCodes.OK);
  } catch (error) {
    console.error("send-email error:", error);
    return json({ error: "Błąd podczas wysyłania!" }, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

function json(payload, status) {
  return Response.json(payload, { status });
}
