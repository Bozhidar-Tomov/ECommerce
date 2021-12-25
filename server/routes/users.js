const router = require("express").Router();

const {
  signin,
  signup,
  sendVerificationEmail,
  validate,
  addProductToLikedList,
  addProductToCart,
  fetchUserData,
  removeItemFromUserData,
  deleteUser,
} = require("../controllers/user.js");

const { auth } = require("../middleware/auth");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/sendVerificationEmail", sendVerificationEmail);
router.get("/validate/:token", validate);
router.get("/fetchUserData", auth, fetchUserData);
router.post("/removeItemFromUserData", auth, removeItemFromUserData);
router.post("/addProductToLikedList", auth, addProductToLikedList);
router.post("/addProductToCart", auth, addProductToCart);
router.delete("/deleteUser", auth, deleteUser);

module.exports = router;
