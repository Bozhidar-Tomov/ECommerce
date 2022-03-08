const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Product = require("../models/product.model");
const Order = require("../models/order.model");
const mongoose = require("mongoose");
const axios = require("axios");
const { sendConfirmationEmail } = require("../utils/verificationEmail");
const constants = require("../constants");

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
        name: existingUser.name,
        email: existingUser.email,
        id: existingUser._id,
        isAccountValidated: existingUser.isAccountValidated,
      },
      process.env.SECRET_KEY,
      {
        expiresIn: 1000 * 60 * 60 * 12, // 6 hours validity
      }
    );

    return res.status(200).json({
      token,
      rememberMe,
    });
  } catch (error) {
    console.log("error user signin", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    recaptchaToken,
    ip,
    internetProvider,
    currency,
    country,
  } = req.body;

  try {
    if (!(await validateHuman(recaptchaToken, ip))) {
      return res
        .status(401)
        .json({ message: "You can't sign in right now. Try again later (0x255r)" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(422).json({ message: "User already exists." });

    if (password !== confirmPassword) {
      return res.status(401).send({ message: "Password does not match." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      firstName,
      lastName,
      email,
      country,
      password: hashedPassword,
      ip,
      currency,
      internetProvider,
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
      expiresIn: 1000 * 60 * 15, // 15 minutes validity,
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
          title: "Your email has already been verified!",
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

const fetchUserData = async (req, res) => {
  await User.findById(req.userId)
    .then(async (data) => {
      let info = {};
      await Product.find({ _id: { $in: data.cart } })
        .then((data) => {
          let cart = [];
          for (item of data) {
            cart.push({ name: item.name, price: item.price, id: item._id });
          }
          info.cart = cart;
        })
        .catch((err) => {
          res.status(400).send(err);
          console.log(err);
        });

      await Product.find({ _id: { $in: data.likedList } })
        .then((data) => {
          let likedList = [];
          for (item of data) {
            likedList.push({ name: item.name, price: item.price, id: item._id });
          }
          info.likedList = likedList;
        })
        .catch((err) => {
          res.status(400).send(err);
          console.log(err);
        });
      let ordersList = [];
      for (order of data.orders) {
        await Order.findById(order).then(async (orderData) => {
          let orderObject = {};
          let itemsList = [];
          await Product.find({ _id: { $in: orderData.items } })
            .then((productData) => {
              for (item of productData) {
                itemsList.push({ name: item.name, price: item.price, id: item._id });
              }
              orderObject.items = itemsList;
              orderObject.amount = orderData.amount;
              orderObject.phoneNumber = orderData.phoneNumber;

              ordersList.push(orderObject);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }

      info.userInfo = {
        country: data.country,
        email: data.email,
        createdAt: data.createdAt.toString().substr(4, 17),
        isAccountValidated: data.isAccountValidated,
      };
      info.ordersList = ordersList;

      res.status(200).send(info);
    })
    .catch((error) => {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    });
};
const removeItemFromUserData = async (req, res) => {
  const { item, field } = req.body;

  if ((field === constants.CART) ^ (field === constants.LIKED_LIST)) {
    await User.findById(req.userId)
      .then(async (data) => {
        const index = data[field].indexOf(item);
        if (index === -1) return res.status(400).send("index error");

        if (data[field].length === 0) return res.status(204).send();

        data[field].splice(index, 1);

        await User.findByIdAndUpdate(req.userId, { [field]: data[field] })
          .then(res.status(200).send("removed"))
          .catch((error) => {
            console.log(error);
            return res.status(500).json({ message: "Internal server error" });
          });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
      });
  } else {
    console.log("not executed");
    return res.status(400).send();
  }
};

const addProductToLikedList = async (req, res) => {
  const { productId } = req.body;

  await User.findById(req.userId)
    .then(async (data) => {
      const lst = data.likedList;
      if (lst.includes(productId)) {
        const index = lst.indexOf(productId);
        if (index > -1) {
          lst.splice(index, 1);
        }
      } else lst.push(mongoose.Types.ObjectId(productId));

      await User.findByIdAndUpdate(req.userId, { likedList: lst })
        .then(res.status(200).send("done liking"))
        .catch((error) => {
          console.log(error.message);
          return res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const addProductToCart = async (req, res) => {
  const { productId } = req.body;

  await User.findById(req.userId)
    .then(async (data) => {
      const lst = data.cart;
      if (lst.includes(productId)) {
        const index = lst.indexOf(productId);
        if (index > -1) {
          lst.splice(index, 1);
        }
      } else lst.push(mongoose.Types.ObjectId(productId));

      await User.findByIdAndUpdate(req.userId, { cart: lst })
        .then(res.status(200).send("add to cart done"))
        .catch((error) => {
          console.log(error.message);
          return res.status(500).json({ message: "Internal server error" });
        });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.userId)
    .then(res.status(200).send("deleted"))
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ message: "Internal server error" });
    });
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

exports.fetchUserData = fetchUserData;
exports.removeItemFromUserData = removeItemFromUserData;
exports.addProductToLikedList = addProductToLikedList;
exports.addProductToCart = addProductToCart;
exports.deleteUser = deleteUser;
