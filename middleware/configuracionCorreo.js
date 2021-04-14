const nodemailer = require("nodemailer");

exports.enviandocorreo = ( req, res ) => {

  const { nombre, asunto, email, telefono, area, comentario } =  req.body;

  const htmlMensaje = `
    <h1>Datos cliente servicio</h1>
    <p style="padding: 10px 0;">
        Solicitud de servicio por: <span>${nombre}</span>
    </p>
    <table style="border: 1px solid black;
                border-collapse: collapse;
                margin: 20px 0;">
        <tr>
            <th style="padding: 10px;
                border: 1px solid black;">Nombre</th>
            <th style="padding: 10px;
                border: 1px solid black;">Telefono</th>
            <th style="padding: 10px;
                border: 1px solid black;">Correo</th>
            <th style="padding: 10px;
                border: 1px solid black;">Asunto</th>
            <th style="padding: 10px;
                border: 1px solid black;">area</th>
            <th style="padding: 10px;
                border: 1px solid black;">Comentario</th>
        </tr>
        <tr>
            <td style="padding: 10px;
                border: 1px solid black;">${nombre}</td>
            <td style="padding: 10px;
                border: 1px solid black;">${telefono}</td>
            <td style="padding: 10px;
                border: 1px solid black;">${email}</td>
            <td style="padding: 10px;
                border: 1px solid black;">${asunto}</td>
            <td style="padding: 10px;
                border: 1px solid black;">${area}</td>
            <td style="padding: 10px;
                border: 1px solid black;">${comentario}</td>
        </tr>
    </table>
    <p style="padding: 2px 0;">Solicitud generada desde la pagina web.</p>
    <p style="padding: 2px 0;">Spyder PC & MAC.</p>
    <a style="text-decoration: none; padding: 2px 0; display: block; color: blue; width: 100px;" href="https://zen-swanson-e300d5.netlify.app/">Sitio Web</a>
    <p style="padding: 2px 0;">Correo: pcspyder86@gmail.com</p>
  `;


  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "pcspyder86@gmail.com", 
      pass: "abascal12345", 
    },
  });

  let message = {
      from: "spyder pc",
      to: "pcspyder86@gmail.com",
      subject: "spyder pc reparaciones",
      text: `Hola`,
      html: htmlMensaje
  };


  transporter.sendMail( message, ( err, info) => {
    if(err){
        return res.status(400).json({
            ok: false,
            err
        });
    }

    res.json(info);
  });

}