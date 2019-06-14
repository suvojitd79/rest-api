const jwt = require("jsonwebtoken");
const uuid = require("uuid4");
const response_code = require("../responses");
const getKey = () => {
  return jwt.sign({ uuid: uuid() }, process.env.PRIVATE_KEY, {
    expiresIn: "5d" //5 days
  });
};

const isValidJWT = (req, res, next) => {
  const token = req.headers["auth-token"];
  if (token != undefined) {
    jwt.verify(token, process.env.PRIVATE_KEY, (error, decode) => {
      if (error)
        return res
          .status(401)
          .json(
            response_code(
              401,
              " Invalid Auth token has been provided.Please request for the token and then try again."
            )
          );
      //valid token
      else next();
    });
  } else
    return res
      .status(401)
      .json(response_code(401, "Auth token is required to access this route"));
};

module.exports.getKey = getKey;
module.exports.isValidJWT = isValidJWT;
