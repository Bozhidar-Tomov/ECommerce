const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

app.use(cors());
app.use(express.json());

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const promoCodeRoutes = require("./routes/promoCodes");

app.use("/products", productRoutes);
app.use("/users", userRoutes);
app.use("/promo-codes", promoCodeRoutes);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`))
  )
  .catch((error) => console.log(`${error} did not connect`));
