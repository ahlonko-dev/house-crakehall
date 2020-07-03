"use strict";

const mongoDatabase = require("../_helpers/db");

const database = mongoDatabase.getDb();
module.exports = {
  users
};

const users = () => {
  return new Promise((resolve, reject) => {
    database.collection("users").find().toArray((err, docs) => {
      if (err) {
        return reject(err);
      }

      console.log(docs);
      return resolve(docs);
    });
  });
};
//# sourceMappingURL=algo.js.map