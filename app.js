const express = require("express");
const app = express();
const mongoose = require("mongoose");
const List = require("./routes/list");
const Auth = require("./routes/auth");
const cors = require("cors");
require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT;

async function main() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (err) {
    console.log("error while connecting to your DataBase : ", err);
    process.exit(1);
  }
}
main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => console.log(err));

app.use("/list", List);
app.use("/auth", Auth);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
