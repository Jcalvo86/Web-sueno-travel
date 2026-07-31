export default async function handler(req, res) {
  // Solo permitir peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utilizar POST.' });
  }

  const { name, email, message, destinations } = req.body;

  // Validación básica
  if (!name || !email) {
    return res.status(400).json({ error: 'Faltan campos requeridos (nombre y email).' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('Error: RESEND_API_KEY no está configurada en las variables de entorno de Vercel.');
    return res.status(500).json({ error: 'Configuración de correo no disponible en el servidor.' });
  }

  // Si hay destinos seleccionados, darles formato para el correo
  const destinationsText = Array.isArray(destinations) && destinations.length > 0
    ? destinations.join(', ')
    : (destinations || 'Ninguno especificado');

  // Construir cuerpo del correo en HTML
  const emailHtml = `
    <h2>Nueva Solicitud de Información — Sueño Travel</h2>
    <p>Se ha recibido un nuevo mensaje desde el formulario de contacto del sitio web:</p>
    <table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%; max-width: 600px; font-family: sans-serif;">
      <tr>
        <td style="font-weight: bold; background-color: #f8fafc; width: 30%;">Nombre Completo:</td>
        <td>${name}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #f8fafc;">Correo de Contacto:</td>
        <td><a href="mailto:${email}">${email}</a></td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #f8fafc;">Destinos de Interés:</td>
        <td>${destinationsText}</td>
      </tr>
      <tr>
        <td style="font-weight: bold; background-color: #f8fafc;">Mensaje / Detalles:</td>
        <td style="white-space: pre-wrap;">${message || 'Sin mensaje adicional'}</td>
      </tr>
    </table>
    <br>
    <hr>
    <p style="font-size: 0.85rem; color: #64748b;">Este correo fue generado automáticamente desde el formulario web de Sueño Travel.</p>
  `;

  try {
    // Realizamos la llamada a la API de Resend directamente usando fetch
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        // Si no has verificado el dominio suenotravel.cl en Resend,
        // debes usar 'onboarding@resend.dev' como emisor por defecto.
        from: 'Sueño Travel Web <onboarding@resend.dev>',
        to: 'contacto@suenotravel.cl',
        subject: `Nueva Cotización Web - ${name}`,
        html: emailHtml,
        reply_to: email
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Error de Resend API:', data);
      return res.status(response.status).json({ error: data.message || 'Error al enviar el correo.' });
    }

    return res.status(200).json({ success: true, message: 'Correo enviado con éxito.', id: data.id });
  } catch (error) {
    console.error('Error en la serverless function:', error);
    return res.status(500).json({ error: 'Error interno del servidor al procesar el correo.' });
  }
}
