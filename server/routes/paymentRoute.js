const express = require("express");
const router = express.Router();

const { createCheckoutSession, webhook } = require("../controllers/payment.js");

const { auth } = require("../middleware/auth");

router.post("/create-checkout-session", auth, createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), webhook);

module.exports = router;
