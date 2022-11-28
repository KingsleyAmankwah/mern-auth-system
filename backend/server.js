const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");

const Port = process.env.PORT || 5000;
connectDB();

const app = express();

app.use("/api/users", require("./routes/userRoutes"));

app.listen(Port, () => console.log(`Server is runnig on Port ${Port}`));
