/* eslint-disable no-unused-vars */
const express = require("express");
const router = express.Router();
const treeService = require("./trees.service");
const userService = require("../users/user.service");
const {User} = require("../_helpers/db");
//const {RuleTester} = require("eslint");

router.get("/alltrees", treeService.getAllTrees);

router.get("/:getidplayer", treeService.getIdPlayer);

router.get("/newplayer/:getidplayer", treeService.newPlayerTreesGenerator);

router.get(
    "/buyotherplayertree/:treeid/:playerid",
    treeService.buyOtherPlayerTree,
);

router.get("/locktree/:getidplayer/:getidtree", treeService.lockFreeTree);

module.exports = router;
