const router = require("express").Router();

const { signin, signup, sendVerificationEmail, validate } = require("../controllers/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/sendVerificationEmail", sendVerificationEmail);
router.get("/validate/:token", validate);

module.exports = router;
