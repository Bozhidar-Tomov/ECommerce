const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const User = require("../models/user.model");
const Product = require("../models/product.model");
const axios = require("axios");
const Order = require("../models/order.model");

const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

const createCheckoutSession = async (req, res) => {
  const items = [];
  const seen = [];
  let email;
  await User.findById(req.userId).then(async (data) => {
    if (!data.isAccountValidated) return res.status(405).send();
    const cart = data.cart;
    email = data.email;
    for (item of cart) {
      await Product.findById(item).then((data) => {
        if (seen.indexOf(data.code) === -1) {
          seen.push(data.code);
          items.push({
            name: data.name,
            amount: data.price * 100,
            description: data.category + ` • Item: ${data.code}`,
            currency: "usd",
            quantity: 1,
          });
        } else {
          for (cartItem of items) {
            if (parseInt(cartItem.description.split("Item: ")[1]) === data.code) {
              cartItem.quantity += 1;
            }
          }
        }
      });
    }
  });

  await stripe.checkout.sessions
    .create({
      customer_email: email,
      payment_method_types: ["card"],
      phone_number_collection: {
        enabled: true,
      },
      mode: "payment",
      line_items: items,
      success_url: "http://localhost:3000/payment/success",
      cancel_url: "http://localhost:3000/payment/cancel",
    })
    .then(async (e) => {
      console.log("seen:", seen, "\n items:", items);
      res.status(200).send(e.url);
    })
    .catch((err) => console.log("ERROR:", err));
};
const webhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.log(err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  switch (event.type) {
    case "payment_intent.created":
      res.status(200).send();
      break;
    case "payment_intent.succeeded":
      await axios
        .get(`https://api.stripe.com/v1/customers/${event.data.object.customer}`, {
          headers: {
            Authorization: `Bearer ${process.env.STRIPE_PRIVATE_KEY}`,
          },
        })
        .then(async (data) => {
          res.status(200).send();
          await User.findOne({ email: data.data.email }).then(async (userData) => {
            await Order.create({
              user: userData._id,
              items: userData.cart,
              amount: event.data.object.amount / 100,
              address: data.data.address,
              phoneNumber: data.data.phone,
              status: "completed",
            })
              .then(async (data) => {
                let order = userData.orders;
                order.push(data._id);

                await User.findByIdAndUpdate(userData._id, {
                  orders: order,
                  cart: [],
                })
                  .then(res.status(200).send())
                  .catch((err) => {
                    console.log(err.message);
                    res.status(500).send();
                  });
              })
              .catch((err) => {
                console.log(err.message);
                res.status(500).send();
              });
          });
        })
        .catch((err) => {
          console.log(err.message);
          res.status(500).send();
        });
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
};

exports.createCheckoutSession = createCheckoutSession;
exports.webhook = webhook;
