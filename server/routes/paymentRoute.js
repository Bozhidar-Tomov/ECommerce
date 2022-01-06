const router = require("express").Router();

const { createCheckoutSession } = require("../controllers/payment.js");

const { auth } = require("../middleware/auth");

router.post("/create-checkout-session", auth, createCheckoutSession);

module.exports = router;
