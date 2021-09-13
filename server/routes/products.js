const router = require("express").Router();
const Product = require("../models/product.model");

router.route("/").get((req, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Product.findById(req.params.id)
    .then((product) => {
      res.json(product);
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const newProduct = new Product({
    name: "Lenovo Ideapad 3 15TL",
    code: 52480,
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit, optio! Ea, alias aperiam. Magni hic obcaecati pariatur. Cumque, perspiciatis voluptatum.",
    shortInfo: {
      CPU: "AMD RYZEN 5500u 2.1GHz",
      SSD: "512 GB",
      GPU: "AMD RADEON INTEGRATED GRAPHICS",
      RAM: "12GB DDR4",
    },
    longInfo: {
      "Screen size": "15.6''",
      OS: "Windows 10 Home ®",
      Weight: "1.840KG",
      Display: "IPS Matt",
      "Display Resolution": "1920x1080 pixels",
      "Web Camera": "720p with Privacy Shutter",
      "Keyboard Backlight": "NONE",
      Color: "Galaxy Gray",
      Warranty: "24 Months",
    },
    price: 1349.99,
    category: "laptop",
  });

  newProduct
    .save()
    .then(() => res.json("Product added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
