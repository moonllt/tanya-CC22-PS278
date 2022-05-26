const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const tiketBus = require("../models/tiketBus");
const verified = require("./verify");

//ADD tiket
router.post("/", verified, async (req, res) => {
  const tiket = new tiketBus(req.body);

  try {
    const addTiket = await tiket.save();
    res.status(200).json(addTiket);
  } catch (err) {
    res.status(500).json({ message: "input data tiket!" });
  }
});

//UPDATE tiket
router.put("/:tiketId", verified, async (req, res) => {
  try {
    const ubahTiket = await tiketBus.findByIdAndUpdate(req.params.tiketId, { $set: req.body }, { new: true });
    res.status(200).json(ubahTiket);
  } catch (err) {
    res.status(500).json({ message: "ubah data tiket!" });
  }
});

//GET all tiket
router.get("/", verified, async (req, res) => {
  try {
    const tickets = await tiketBus.find();
    res.json(tickets);
  } catch (err) {
    res.json({ message: "not found" });
  }
});

//GET tiket by id
router.get("/:tiketId", verified, async (req, res) => {
  try {
    const getTiket = await tiketBus.findById(req.params.tiketId);
    res.status(200).json(getTiket);
  } catch (err) {
    res.status(500).json({ message: "input id tiket!" });
  }
});

//DELETE tiket by id
router.delete("/:tiketId", verified, async (req, res) => {
  try {
    const delTiket = await tiketBus.deleteOne({ _id: req.params.tiketId });
    res.json(delTiket);
  } catch (err) {
    res.status(500).json({ message: "input id tiket!" });
  }
});

module.exports = router;
