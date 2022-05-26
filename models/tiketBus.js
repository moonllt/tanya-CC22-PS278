const mongoose = require("mongoose");

//tiket pilih product jenis tiket (tiket)
const tiketBusSchema = new mongoose.Schema({
  jenisBus: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("tiketBus", tiketBusSchema);
