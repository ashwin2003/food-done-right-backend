const express = require("express");
const delivery = require("./routes/delivery");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use("", delivery);

module.exports = app;
