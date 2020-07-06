/* eslint-disable consistent-return */

/* eslint-disable no-use-before-define */
const expressJwt = require("express-jwt"); //const config = require("./config.json");


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
    path: [// public routes that don"t require authentication
    "/users/authenticate", "/users/register", "/hello", "/"]
  });
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub); // revoke token if user no longer exists

  if (!user) {
    return done(null, true);
  }

  done();
}
//# sourceMappingURL=jwt.js.map