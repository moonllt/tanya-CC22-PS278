const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//connect DB
mongoose.connect(process.env.access_db, () => console.log("check database"));

//import route
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const tiketRoute = require("./routes/TiketBus");
const transaksiRoute = require("./routes/Transaksi");
// const paymentRoute = require("./routes/payment");

//middleware | run when hits routes
app.use(express.json());

//route middleware
app.use("/tanya/user", userRoute);
app.use("/tanya/auth", authRoute);
app.use("/tanya/tiket", tiketRoute);
app.use("/tanya/transaksi", transaksiRoute);
// app.use("/tanya/payment", paymentRoute);

//running app
app.listen(process.env.PORT || 2000, () => console.log("server ok!"));
