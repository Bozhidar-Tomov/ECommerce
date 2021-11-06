const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const isCustomAuth = token?.length < 500;

    let decodedData;

    if (!token) {
      return res.status(403).json({ message: "Not authenticated. Sign in again." });
    } else {
      if (isCustomAuth) {
        decodedData = jwt.verify(token, process.env.SECRET_KEY);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    }

    next();
    return;
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log(error);
  }
};

exports.auth = auth;
