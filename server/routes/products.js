const router = require("express").Router();

const { fetchAllProducts, fetchOneProduct } = require("../controllers/product.js");

router.get("/app", fetchAllProducts);
router.get("/:id", fetchOneProduct);

module.exports = router;
