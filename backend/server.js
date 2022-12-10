const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler);

const Port = process.env.PORT || 8000;

app.listen(Port, () => {
  connectDB();
  console.log(`Server is runnig on Port ${Port}`);
});
