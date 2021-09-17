const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const axios = require("axios");

require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

async function validateHuman(token, ip) {
  return await axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${token}&remoteip=${ip}`
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
  const { email, password, rememberMe, token, ip } = req.body;

  if (!(await validateHuman(token, ip))) {
    return res
      .status(400)
      .json({ message: "You can't sign in right now. Try again later (0x255r)" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User does not exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY, {
      expiresIn: 60 * 60,
    });

    return res.status(200).json({ result: existingUser, token, rememberMe });
  } catch (error) {
    console.log("error user signin", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, email, country, password, confirmPassword, rememberMe, token, ip } =
    req.body;

  if (!(await validateHuman(token, ip))) {
    return res
      .status(400)
      .json({ message: "You can't sign in right now. Try again later (0x255r)" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password does not match." });
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
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, {
      expiresIn: 60 * 60,
    });
    return res.status(200).json({ result, token, rememberMe });
  } catch (error) {
    console.log("error user signup", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const deleteUser = async (req, res) => {};

exports.signin = signin;
exports.signup = signup;
exports.deleteUser = deleteUser;
