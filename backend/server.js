const express = require("express");
const dotenv = require("dotenv").config();

const Port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(Port, () => console.log(`Server is runnig on Port ${Port}`));
