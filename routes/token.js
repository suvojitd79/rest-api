const token = require("../auth/jwt");
const routeToken = require("express").Router();

routeToken.get("/", async (req, res) => {
  const key = await token.getKey();
  res.status(200).json({ token: key, expiresIn: "5 days" });
});

module.exports = routeToken;
