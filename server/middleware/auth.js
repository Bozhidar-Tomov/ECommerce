const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authentication?.split(" ")[1];
    let decodedData;

    if (!token) {
      return res.status(403).json({ message: "Not authenticated. Sign in again." });
    } else {
      decodedData = jwt.verify(token, process.env.SECRET_KEY);
      req.userId = decodedData?.id;
    }

    next();
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

exports.auth = auth;
