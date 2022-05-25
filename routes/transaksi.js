const router = require("express").Router();
const req = require("express/lib/request");
const res = require("express/lib/response");
const transaksi = require("../models/Transaksi");
const verified = require("./verify");

//TRANSAKSI
router.post("/", verified, async (req, res) => {
  const addTransaksi = new transaksi(req.body);

  try {
    const Transaksi = await addTransaksi.save();
    res.status(200).json(Transaksi);
  } catch (err) {
    res.status(500).json({ message: "input data transaksi!" });
  }
});

//UPDATE transaksi
router.put("/:transaksiId", verified, async (req, res) => {
  try {
    const ubahTransaksi = await transaksi.findByIdAndUpdate(req.params.transaksiId, { $set: req.body }, { new: true });
    res.status(200).json(ubahTransaksi);
  } catch (err) {
    res.status(500).json({ message: "update data transaksi!" });
  }
});

//GET all transaksi
router.get("/", verified, async (req, res) => {
  try {
    const allTransaksi = await transaksi.find();
    res.json(allTransaksi);
  } catch (err) {
    res.json({ message: "not found" });
  }
});

//GET transaksi by id
router.get("/:transaksiId", verified, async (req, res) => {
  try {
    const getTransaksi = await transaksi.findById(req.params.transaksiId);
    res.status(200).json(getTransaksi);
  } catch (err) {
    res.status(500).json({ message: "input id transaksi!" });
  }
});

//DELETE transaksi by id
router.delete("/:transaksiId", verified, async (req, res) => {
  try {
    const delTransaksi = await transaksi.deleteOne({ _id: req.params.transaksiId });
    res.json(delTransaksi);
  } catch (err) {
    res.status(500).json({ message: "input id transaksi!" });
  }
});

module.exports = router;
