const router = require("express").Router();

const {
  signin,
  signup,
  sendVerificationEmail,
  validate,
  getCart,
  removeItemFromCart,
} = require("../controllers/user.js");

const { auth } = require("../middleware/auth");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/sendVerificationEmail", sendVerificationEmail);
router.get("/validate/:token", validate);
router.get("/getCart", auth, getCart);
router.post("/removeItemFromCart", auth, removeItemFromCart);
router.get("/getFavoriteList", validate);

module.exports = router;
