const token = require("../auth/jwt");
const routeToken = require("express").Router();

routeToken.get("/", (req, res) => {
  res.status(200).json({ token: token.getKey(), expiresIn: "5 days" });
});

module.exports = routeToken;
