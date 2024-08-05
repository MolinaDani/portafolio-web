export default function ({ userName, userLastName, userEmail, userMessage }) {
  return `
    <div style="width: 100%; max-width: 850px; border: 2px solid #cecaca; border-radius: 10px; padding: 15px 30px; font-family: sans-serif; color: #282641;">
        <h1 style="font-size: 1.8rem; text-align: center; margin: 0">¡Alguien te ha contactado!</h1>
        <h2 style="font-size: 1rem; color: #464655; text-align: center; margin: 0">Has recibido un mensaje desde tu portafolio web.</h2>

        <div style="font-size: 0.9rem; margin-top: 10px;">
            <span>Nombre: <strong>${userName} ${userLastName}</strong></span><br>
            <span>Correo Electrónico:
                <a href="mailto:${userEmail}" style="color: rgb(20, 109, 199)">
                    <strong>${userEmail}</strong>
                </a>
            </span>
        </div>

        <p style="font-size: 0.9rem; margin-top: 10px">${userMessage}</p>

        <a href="mailto:${userEmail}" style="display: block; padding: 12px 18px; border-radius: 5px; color: white; background-color: rgb(42, 148, 42); text-decoration: none; width: fit-content; margin: 15px auto 0 auto; font-size: 0.9rem;">Responder correo</a>
    </div>
    `;
}
