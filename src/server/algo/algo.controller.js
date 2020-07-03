/* eslint-disable no-confusing-arrow */
/* eslint-disable no-use-before-define */
const express = require("express");
const router = express.Router();
const algoService = require("./algo.service");
const userService = require("../users/user.service");
const db = require("../_helpers/db");
const User = db.User;

// routes

router.get("/money/:playerid", getMoney);

async function getMoney(req, res) {
    const playerId = req.params.playerid;
    try {
        const playerInfo = await User.findById(playerId);
        console.log(playerInfo);
    } catch (error) {
        console.log(error);
    }
}

module.exports = router;
