const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function (name, email, token) {
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      secureConnection: false,
      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
      tls: {
        ciphers: "SSLv3",
      },
    });

    const message = {
      from: process.env.USER,
      to: email,
      subject: "Tech Checkie - Activate Account",
      html: `
        <h3> Hello ${name} </h3>
        <p>Thank you for registering into our Online Store. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="https://tech-checkie-noit.herokuapp.com/app/auth/activationStatus/${token}"> Click here </a></p>
        <p>Cheers</p>
        <p>Tech Checkie Team</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        console.log("sent!");
        res(info);
      }
    });
  });
};
