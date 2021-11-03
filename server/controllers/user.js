const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const axios = require("axios");
const { sendConfirmationEmail } = require("../utils/verificationEmail");

require("dotenv").config();

async function validateHuman(recaptchaToken, ip) {
  return await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}&remoteip=${ip}`
    )
    .then((res) => {
      return res.data.success;
    })
    .catch((err) => {
      console.log(err);
      return null;
    });
}

const signin = async (req, res) => {
  const { email, password, rememberMe, recaptchaToken, ip } = req.body;

  try {
    if (!(await validateHuman(recaptchaToken, ip))) {
      return res
        .status(401)
        .json({ message: "You can't sign in right now. Try again later (0x255r)" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign(
      {
        email: existingUser.email,
        id: existingUser._id,
        isAccountValidated: existingUser.isAccountValidated,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    return res.status(200).json({
      result: {
        name: existingUser.name,
        email: existingUser.email,
        userID: existingUser._id,
      },
      token,
      rememberMe,
    });
  } catch (error) {
    console.log("error user signin", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, country, password, confirmPassword, recaptchaToken, ip } =
    req.body;

  try {
    if (!(await validateHuman(recaptchaToken, ip))) {
      return res
        .status(401)
        .json({ message: "You can't sign in right now. Try again later (0x255r)" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(422).json({ message: "User already exists." });

    if (password !== confirmPassword) {
      return res.status(401).json({ message: "Password does not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email,
      country,
      password: hashedPassword,
    });

    return res.status(201).json({ name: result.name, email: result.email, userID: result._id });
  } catch (error) {
    console.log("error user signup", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const sendVerificationEmail = async (req, res) => {
  try {
    const { name, email, userID } = req.body;
    const token = jwt.sign({ name, email, id: userID }, process.env.SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });

    await sendConfirmationEmail(name, email, token);

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const validate = async (req, res) => {
  try {
    let token;
    try {
      token = jwt.verify(req.params.token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).json({
        title: "Verification Link has Expired. ",
        description: "No problem! We can send you a new one. Click the button below.",
      });
    }

    const result = await User.findByIdAndUpdate(token.id, { isAccountValidated: true });

    if (result) {
      if (!result.isAccountValidated)
        return res.status(200).json({
          title: "Email Verification Successful!",
          description: "Your email has been verified. You can now sign in and use our services.",
        });
      else {
        return res.status(409).json({
          title: "Your email has been already verified!",
          description: "You can now sign in and start using our services",
        });
      }
    }
    res.status(404).json({
      title: "Verification Link Malformed",
    });
  } catch (error) {
    console.log("error user validate", err);
    res.status(500).json({
      title: "Something went wrong on our side.",
      description: "We cannot verify your account right now.",
    });
  }
};
// try {
//   let {id} = jwt.verify(req.params.token, process.env.SECRET_KEY);
// } catch (error) {
//   return res.status(401).json({
//     title: "Verification Link has Expired. ",
//     description: "No problem! We can send you a new one. Click the button below.",
//   });
// }

exports.signin = signin;
exports.signup = signup;
exports.sendVerificationEmail = sendVerificationEmail;
exports.validate = validate;
