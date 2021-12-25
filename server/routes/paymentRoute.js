const router = require("express").Router();

const { createCheckoutSession } = require("../controllers/payment.js");

const { auth } = require("../middleware/auth");

router.post("/create-checkout-session", createCheckoutSession);

module.exports = router;
