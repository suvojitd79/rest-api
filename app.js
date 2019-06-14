require("dotenv").config();
const express = require("express");
const app = express();

app.get("*", (req, res) => {
  res.status(200).json({ status: 200 });
});

//connect it to port 8080
const server = app.listen(process.env.PORT, err => {
  if (err) console.log(err);
  console.log(`connected with port ${process.env.PORT}`);
});
