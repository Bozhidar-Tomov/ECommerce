const router = require("express").Router();

const {
  fetchAllProducts,
  fetchOneProduct,
  addProduct,
  deleteProduct,
} = require("../controllers/product.js");

const { admin } = require("../middleware/admin");

router.get("/", fetchAllProducts);
router.get("/:id", fetchOneProduct);
router.post("/add", admin, addProduct);
router.delete("/delete", admin, deleteProduct);

module.exports = router;
