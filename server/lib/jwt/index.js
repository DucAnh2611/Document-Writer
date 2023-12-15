const jwt = require("jsonwebtoken");
const config = require("../../config");

const verifyToken = (req, res, next) => {

  const token =
    req.body.token || req.query.token || req.headers["x-access-token"] || JSON.parse(req.cookies[config.cookie]).token;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);

    if(parseInt(new Date().getTime()/1000 - decoded.exp) > 0 ) {
      res.cookie(config.cookie, JSON.stringify({
        token: newToken(decoded, "72h")
      }));
    }
    else {
      req.user = {
        ...decoded
      };
    }

  } catch (err) {
    return res.status(401).json({status: "fail", message: "Invalid Token"});
  }
  return next();
};

const newToken = (decoded, expire = "24h") => {
  return jwt.sign(
    decoded, 
    config.TOKEN_KEY,
    {expiresIn: expire}
  );
}
module.exports = {
  auth: verifyToken, 
  newToken: newToken
};