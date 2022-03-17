const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.sendConfirmationEmail = function (name, email, token) {
  return new Promise((res, rej) => {
    // Create transporter object with gmail service
    const transporter = nodemailer.createTransport({
      service: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const message = {
      from: process.env.GOOGLE_USER,
      // to: email // in production uncomment this
      // While we are testing we want to send a message to our selfs
      to: email,
      subject: "Store - Activate Account",
      html: `
        <h3> Hello ${name} </h3>
        <p>Thank you for registering into our Online Store. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="https://tech-checkie-noit.herokuapp.com/auth/activationStatus/${token}"> Click here </a></p>
        <p>Cheers</p>
        <p>Tech Checkie Team</p>
      `,
    };

    transporter.sendMail(message, function (err, info) {
      if (err) {
        rej(err);
      } else {
        res(info);
      }
    });
  });
};
