const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const createCheckoutSession = async (req, res) => {
  await stripe.checkout.sessions
    .create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [{ name: "item1", amount: 2000, currency: "usd", quantity: 2 }],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    })
    .then((e) => res.status(200).send(e.url))
    .catch((err) => console.log("ERROR:", err.message));
};

exports.createCheckoutSession = createCheckoutSession;
