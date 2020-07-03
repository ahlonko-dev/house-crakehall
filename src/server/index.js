/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
require("rootpath")();
import path from "path";
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("./_helpers/jwt");
const errorHandler = require("./_helpers/error-handler");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../../bin/client")));

// use JWT auth t<o secure the api
//app.use(jwt());
// / api routes
app.use("/users", require("./users/users.controller"));
app.use("/trees", require("./trees/trees.controller"));
app.use("/algo", require("./algo/algo.controller"));

// global error handler
app.use(errorHandler);

//app.use(jwt());
// start server
const {APP_PORT} = process.env;

app.listen(APP_PORT, () =>
    console.log(`🚀 Server is listening on port ${APP_PORT}.`),
);
