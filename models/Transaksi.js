const mongoose = require("mongoose");

const transaksiSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    tiketBus: [
      {
        tiketId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    total: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transaksi", transaksiSchema);
