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

//get the details_router
const details_route = require("./routes/details");

//get the token_router
const token_route = require("./routes/token");

//authenticate the jwt key
const jwtValidate = require("./auth/jwt");

/**
 *  
 *  http method: GET
    /details?query_params....
 *  Get the primary information about bank details by
 *  1. branch IFSC code 
 *      /details?ifsc=xx123
 *  2. bank name and a city  
 *    /details?bname=xyz&city=xc1
 */

//private route, jwt protected
app.use("/details", jwtValidate.isValidJWT, details_route);

/**
 *  http method: GET
 *  /token
 *  Get the token for authenticated user
 *
 */

app.use("/token", token_route);

//home page
app.get("/", (req, res) => {
  res.status(200).json({ msg: "welcome to the home page" });
});

//exception for invalid api request
app.get("*", (req, res) => {
  res.status(404).json(res_status(404, "page not found"));
});

//connect it to port 8080
const server = app.listen(process.env.PORT, err => {
  if (err) console.log(err);
  console.log(`connected with port ${process.env.PORT}`);
});
