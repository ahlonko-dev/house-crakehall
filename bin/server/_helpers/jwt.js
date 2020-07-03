"use strict";

const expressJwt = require("express-jwt");

const userService = require("../users/user.service");

module.exports = jwt;

function jwt() {
  const secret = "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING";
  return expressJwt({
    secret,
    isRevoked
  }, {
    expiresIn: "60"
  }).unless({
    path: ["/users/authenticate", "/users/register", "/hello", "/"]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub);

  if (!user) {
    return done(null, true);
  }

  done();
}
//# sourceMappingURL=jwt.js.map