const express = require('express');
const querystring = require('node:querystring');
const config = require('../config');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { login } = require('../lib/mongodb/user');
const { status } = require('../lib/mongodb');
const { newToken } = require('../lib/jwt');
require("dotenv").config();

const authParams = querystring.stringify({
  client_id: config.clientId,
  redirect_uri: config.redirectUrl,
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',  
  state: 'standard_oauth',
  prompt: 'consent',
});
const getTokenParams = (code) => querystring.stringify({
  client_id: config.clientId,
  client_secret: config.clientSecret,
  code,
  grant_type: 'authorization_code',
  redirect_uri: config.redirectUrl,
});

router.get('/url', function(req, res, next) {
  res.json({
    url: `${config.authUrl}?${authParams}`
  })
});

router.get('/token', async function(req, res) { 
  const { code } = req.query;
  if (!code) return res.status(400).json({ message: 'Authorization code must be provided' });
  try {
    // Get all parameters needed to hit authorization server
    const tokenParam = getTokenParams(code);
    // Exchange authorization code for access token (id token is returned here too)
    const rest = await fetch(`${config.tokenUrl}?${tokenParam}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      }
    });
    const data = await rest.json();
    const { id_token } = data;

    if (!id_token) return res.status(400).json({ message: 'Auth error' });
    
    const { email, name, picture } = jwt.decode(id_token);
    const user = { name, email, picture };

    let loginData = await login({email: user.email});
    switch(loginData.status) {
      case status.NOT_FOUND:
        res.status(401).json({status: "fail", message: "user", loggedIn: false});
        break;
      case status.NO_PERMISSION:
        res.status(401).json({status: "fail", message: "password", loggedIn: false});
        break;
      case status.NOT_VALID: 
        res.status(401).json({status: "fail", message: "sql", loggedIn: false});
        break;
      case status.OK:
        let keyToken = {
          ...user,
          id: loginData.data._id
        };

        const token = newToken({ user: keyToken }, "72h");

        res.cookie(process.env.COOKIES_NAME, token, { maxAge: config.tokenExpiration, httpOnly: true,  });

        res.json({ status: "ok", data: {loggedIn: true, user}});
        break;
    }

  } catch (err) {
    console.error('Error: ', err);
    res.status(500).json({ message: err.message || 'Server error' });
  }
});


router.get('/logged_in', async (req, res) => {
  try {
    // Get token from cookie
    const token = req.cookies[process.env.COOKIES_NAME];
    if (!token) return res.json({ loggedIn: false });

    const { user } = jwt.verify(token, config.TOKEN_KEY);
    const newTokneGen = newToken({ user }, "72h");
    // Reset token in cookie
    res.cookie(process.env.COOKIES_NAME, newTokneGen, { maxAge: config.tokenExpiration, httpOnly: true,  });
    res.json({ loggedIn: true, user });
  } catch (err) {
    console.log(err);
    res.json({ loggedIn: false });
  }
});

router.post("/logout", (_, res) => {
  // clear cookie
  res.clearCookie(process.env.COOKIES_NAME).json({ message: 'Logged out' });
})

module.exports = router;
