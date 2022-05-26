const router = require("express").Router();
const User = require("../models/User");
const verified = require("./verify");

//GET | req ke user -> provide skema user
//POST | dpt req dari user/client

//UPDATE data user
router.put("/:userId", verified, async (req, res) => {
  try {
    const updateDataUser = await User.findByIdAndUpdate(req.params.userId, { $set: req.body }, { new: true });
    res.status(200).json(updateDataUser);
  } catch (err) {
    res.status(500).json({ message: "ubah data user!" });
  }
});

//GET all user
router.get("/", async (req, res) => {
  try {
    const allUser = await User.find();
    res.json(allUser);
  } catch (err) {
    res.json({ message: "not found" });
  }
});

//GET user by id
router.get("/:userId", verified, async (req, res) => {
  try {
    const getUser = await User.findById(req.params.userId);
    res.status(200).json(getUser);
  } catch (err) {
    res.status(500).json({ message: "input id user!" });
  }
});

//DELETE user by id
router.delete("/:userId", verified, async (req, res) => {
  try {
    const delUser = await User.deleteOne({ _id: req.params.userId });
    res.json(delUser);
  } catch (err) {
    res.status(500).json({ message: "input id user!" });
  }
});

module.exports = router;
