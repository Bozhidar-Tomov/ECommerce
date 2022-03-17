const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.sendConfirmationEmail = function (name, email, token) {
  return new Promise((res, rej) => {
    // Create transporter object with gmail service
    const transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com", // hostname
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
      // to: email // in production uncomment this
      // While we are testing we want to send a message to our selfs
      to: email,
      subject: "Store - Activate Account",
      html: `
        <h3> Hello ${name} </h3>
        <p>Thank you for registering into our Online Store. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="http://localhost:3000/auth/activationStatus/${token}"> Click here </a></p>
        <p>Cheers</p>
        <p>Online Store Team</p>
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
