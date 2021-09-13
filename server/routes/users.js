const router = require("express").Router();

const { signin, signup, deleteUser } = require("../controllers/user.js");

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/delete_user", deleteUser);

module.exports = router;
