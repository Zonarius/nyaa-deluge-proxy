const GoogleAuth = require('google-auth-library');
const config = require('./config');
const express = require('express');

const auth = new GoogleAuth;
const client = new auth.OAuth2(config.config.auth.google.clientId, '', '');
const app = express();

app.use((req, res, next) => {
  const token = req.header('Authorization');
  if (!config.config.auth.google) {
    next();
  }
  if (!token) {
    res.sendStatus(403);
    return;
  }
  console.time('Verifying');
  client.verifyIdToken(
    token,
    config.config.auth.google.clientId,
    function(error, login) {
      console.timeEnd('Verifying');
      if (error) {
        console.log("Invalid login!", login.getPayload());
        res.sendStatus(403);
        return;
      }
      const payload = login.getPayload();
      console.log("Login success", payload);

      const allowedEmails = config.config.auth.google.allowedEmails;
      if (allowedEmails) {
        if (allowedEmails.indexOf(payload.email) < 0) {
          res.sendStatus(403);
          return;
        }
        console.log("User is one of the allowed users");
      }
      next();
    });  
});

app.get('/api/login', (req, res) => {
  res.send(JSON.stringify({ loggedIn: true }));
});

module.exports = app;