const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.CONNECTION_URL;

const corsOpts = {
  origin: `*`,
};

app.use(cors(corsOpts));
app.use((req, res, next) => {
  if (req.originalUrl === "/api/payments/webhook/") {
    next();
  } else {
    express.json()(req, res, next);
  }
});

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const paymentRoute = require("./routes/paymentRoute");

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/payments", paymentRoute);

mongoose
  .connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Is Set Up Successfully And Is Running `)))
  .catch((error) => console.log(`Error: ${error}. \nDid not connect`));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("/app/", (req, res) => {
    res.sendFile(path.join(__dirname + "../client/build/index.html"));
  });
}
