const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use("/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));

app.use(errorHandler);

const Port = process.env.PORT;

app.listen(Port, () => {
  connectDB();
  console.log(`Server is runnig on Port ${Port}`);
});
