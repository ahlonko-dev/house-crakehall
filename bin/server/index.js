"use strict";

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require("rootpath")();

const express = require("express");

const app = express();

const cors = require("cors");

const bodyParser = require("body-parser");

const jwt = require("./_helpers/jwt");

const errorHandler = require("./_helpers/error-handler");

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(_path.default.resolve(__dirname, "../../bin/client")));
app.use(jwt());
app.use("/users", require("./users/users.controller"));
app.use("/gamer", require("./gamer/gamer.controller"));
app.use("/trees", require("./trees/trees.controller"));
app.use("/algo", require("./algo/algo.controller"));
app.use(errorHandler);
const {
  APP_PORT
} = process.env;
app.listen(APP_PORT, () => console.log(`🚀 Server is listening on port ${APP_PORT}.`));
//# sourceMappingURL=index.js.map