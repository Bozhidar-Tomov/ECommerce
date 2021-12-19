const Product = require("../models/product.model");

const fetchAllProducts = async (req, res) => {
  await Product.find()
    .then((products) => res.status(200).send(products))
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
};

const fetchOneProduct = async (req, res) => {
  await Product.findById(req.params.id)
    .then((product) => res.send(product))
    .catch((err) => {
      res.status(400).json("Error: " + err);
      console.log(err);
    });
};

const addProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

exports.fetchAllProducts = fetchAllProducts;
exports.fetchOneProduct = fetchOneProduct;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
