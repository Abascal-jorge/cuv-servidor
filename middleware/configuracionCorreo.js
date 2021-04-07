const nodemailer = require("nodemailer");

exports.enviandocorreo = ( req, res ) => {

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
      text: "hola buenas tardes"
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