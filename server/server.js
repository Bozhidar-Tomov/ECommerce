const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use((req, res, next) => {
  console.log(req.originalUrl);
  if (req.originalUrl === "/payments/webhook/") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const promoCodeRoutes = require("./routes/promoCodes");
const paymentRoute = require("./routes/paymentRoute");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/promo-codes", promoCodeRoutes);
app.use("/payments", paymentRoute);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(`Error: ${error}. \nDid not connect`));
