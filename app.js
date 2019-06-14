require("dotenv").config();
const express = require("express");
const app = express();

//get the database connection
const client = require("./db/connection");
client
  .connect()
  .then(() => {
    console.log("connected with postgre!");
  })
  .catch(err => {
    console.log(err);
  });

//get the response-object
const res_status = require("./responses");

//get the controller
const details_route = require("./routes/details");

/**
 *  http method: GET
    /details?query_params....
 *  Get the primary information about bank details by
 *  1. branch IFSC code 
 *      /details?ifsc=xx123
 *  2. bank name and a city  
 *    /details?bname=xyz&city=xc1
 */

app.use("/details", details_route);

//exception for invalid api request
app.get("*", (req, res) => {
  res.status(404).json(res_status(404, "page not found"));
});

//connect it to port 8080
const server = app.listen(process.env.PORT, err => {
  if (err) console.log(err);
  console.log(`connected with port ${process.env.PORT}`);
});
