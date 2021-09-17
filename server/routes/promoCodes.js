// const router = require("express").Router();
// const PromoCode = require("../models/promoCode.model");

// router.route("/").get((req, res) => {
//   PromoCode.find()
//     .then((codes) => res.json(codes))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/add").post((req, res) => {
//   var now = new Date();
//   current = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 30);
//   const newPromoCode = new PromoCode({
//     campaign: "Summer Sale",
//     CODE: "SUMMER-21",
//     validFrom: now,
//     validTo: current,
//     typeDiscount: "percentage",
//     discountAmount: "20",
//   });

//   newPromoCode
//     .save()
//     .then(() => res.json("Promo Code added!"))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

const router = require("express").Router();

const { addCode, validateCode, deleteCode } = require("../controllers/promoCode.js");

const { auth } = require("../middleware/auth");

router.post("/add", auth, addCode);
router.post("/validate", auth, validateCode);
router.delete("/delete", auth, deleteCode);

module.exports = router;
