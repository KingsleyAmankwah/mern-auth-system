const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");
const Port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();
app.listen(Port, () => console.log(`Server is runnig on Port ${Port}`));
