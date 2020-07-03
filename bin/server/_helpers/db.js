"use strict";

const mongoose = require("mongoose");

const connectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};
const uri = "mongodb+srv://dbUser:dYhU1vxb81ZX9yyT@bertholdmongodb-ztfz0.mongodb.net/crakehalltrees?retryWrites=true&w=majority";
mongoose.connect(uri, connectionOptions);
mongoose.Promise = global.Promise;
module.exports = {
  User: require("../users/user.model"),
  Gamer: require("../gamer/gamer.model"),
  Arbustum: require("../algo/arbustum.model"),
  Trees: require("../trees/trees.model")
};
//# sourceMappingURL=db.js.map