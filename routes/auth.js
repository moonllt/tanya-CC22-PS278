const User = require("../models/User");
const router = require("express").Router();
//const bcrypt = require("bcrypt");
const jsonToken = require("jsonwebtoken");
const crypthash = require("crypto-js");

//REGISTER

router.post("/register", async (req, res) => {
  //HASH PASSWORD
  const hashedPass = crypthash.AES.encrypt(req.body.password, process.env.key_crypto).toString();

  //regist
  const userRegist = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });

  try {
    const saved = await userRegist.save();
    res.status(200).json(saved);
  } catch (err) {
    res.status(400).json(err);
  }
});

//LOGIN;
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Email is not valid");

  const hashedPass = crypthash.AES.decrypt(user.password, process.env.key_crypto);
  const passwordAwal = hashedPass.toString(crypthash.enc.Utf8);

  if (passwordAwal !== req.body.password) return res.status(400).send("password yang diinput salah");

  ///create token
  const jwt = jsonToken.sign({ _id: user._id }, process.env.key_JWT);

  const { password, ...dataUser } = user._doc;
  res.status(200).json({ ...dataUser, jwt });
});

module.exports = router;
