import nodemailer from "nodemailer";
import "dotenv/config";
import generateEmailHtml from "../../functions/generateEmailHtml";

export async function POST({ request }) {
  const { userName, userLastName, userEmail, userMessage } =
    await request.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.CONTACT_EMAIL,
      pass: process.env.PASSWORD_CONTACT_EMAIL,
    },
  });

  const html = generateEmailHtml({
    userName,
    userLastName,
    userEmail,
    userMessage,
  });

  const mailOptions = {
    from: process.env.CONTACT_EMAIL,
    to: process.env.CONTACT_EMAIL,
    subject: `${userName} ${userLastName} - Contacto desde tu portafolio`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
