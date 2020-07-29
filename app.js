const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const analyticsRoutes = require("./routes/analytics");
const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const positionRoutes = require("./routes/position");
const keys = require("./config/keys");

const app = express();

mongoose
  .connect(keys.MONGO_URI)
  .then(() => console.log("mongoDB has been connected"))
  .catch((err) => console.log(error));

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/analyticsRoutes", analyticsRoutes);
app.use("/api/categoryRoutes", categoryRoutes);
app.use("/api/orderRoutes", orderRoutes);
app.use("/api/positionRoutes", positionRoutes);

module.exports = app;
