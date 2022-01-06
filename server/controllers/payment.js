const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const User = require("../models/user.model");
const constants = require("../constants");
const createCheckoutSession = async (req, res) => {
  await stripe.checkout.sessions
    .create({
      customer_email: "test@etst.com",
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ name: "item1", amount: 2000, currency: "usd", quantity: 2 }],
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    })
    .then(async (e) => {
      // console.log("SESSION RETURN: \n", e, "\n");
      if (e.payment_status === constants.UNPAID) {
        await User.findOne({ email: "development.acc5@gmail.com" }).then(async (user) => {
          user.orders.push("hello from stripe");

          await User.findOneAndUpdate(
            { email: "development.acc5@gmail.com" },
            { cart: [], orders: user.orders }
          )
            .then(console.log("done"))
            .catch((e) => console.log(e));
        });
      }
      res.status(200).send(e.url);
    })
    .catch((err) => console.log("ERROR:", err));
};

exports.createCheckoutSession = createCheckoutSession;
