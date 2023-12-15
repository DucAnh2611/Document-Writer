const jwt = require("jsonwebtoken");
const { newToken } = require("./Model/TokenModel");

const config = require("../../config");

const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    if(parseInt(new Date().getTime()/1000 - decoded.exp) > 0 ) return res.status(401).json({status: "fail", message: "Token expired"});
    else {
      req.user = {
        decoded,
        token: newToken(
          decoded,
          config.TOKEN_KEY,
          {
            expiresIn: "72h"
          }
        )
      };
    }

  } catch (err) {
    return res.status(401).json({status: "fail", message: "Invalid Token"});
  }
  return next();
};

module.exports = verifyToken;