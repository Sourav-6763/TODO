const express = require("express");
const app = express();
const mongoose = require("mongoose");
const List = require("./routes/list");
const Auth = require("./routes/auth");
const morgan = require('morgan');
require('dotenv').config()


app.use(express.json());
const cors = require("cors");
app.use(cors());
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;


async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
main()
  .then(() => {
    console.log(" connected to db");
  })
  .catch((err) => console.log(err));

app.use("/list", List);
app.use("/auth", Auth);

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
