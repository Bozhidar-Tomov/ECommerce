const PromoCode = require("../models/promoCode.model");

const addCode = async (req, res) => {
  //check here
  console.log("add");

  return res.status(500).send("add");
};

const validateCode = async (req, res) => {
  const { code } = req.body;
  console.log(req.body);

  try {
    const existingCode = await PromoCode.findOne({ CODE: code });
    if (!existingCode) return res.status(404).json({ message: "Invalid Code" });

    const isValid =
      existingCode.validFrom.getTime() < new Date().getTime() &&
      existingCode.validTo.getTime() > new Date().getTime();
    if (!isValid) return res.status(404).json({ message: "Code is expired and cannot be used." });

    return res.status(200).json({
      result: {
        name: code,
        typeDiscount: existingCode.typeDiscount,
        discountAmount: existingCode.discountAmount,
      },
      message: "Code applied successfully.",
    });
  } catch (error) {
    console.log("error promo code", error);
    res.status(500).json({ message: "Something went wrong on our side." });
  }
};

const deleteCode = async (req, res) => {
  //check here
  console.log("delete");

  return res.status(500).send("delete");
};

exports.addCode = addCode;
exports.validateCode = validateCode;
exports.deleteCode = deleteCode;
