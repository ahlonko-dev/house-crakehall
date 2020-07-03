/* eslint-disable no-unused-vars */

const express = require("express");
const router = express.Router();
const treeService = require("./trees.service");
const userService = require("../users/user.service");
const {User} = require("../_helpers/db");
//const {RuleTester} = require("eslint");

// Renvois l'ensemble des abres
router.get("/alltrees", treeService.getAllTrees);

// Renvois l'id d'un joueur
router.get("/:getidplayer", treeService.getIdPlayer);

// Donne 3 abres libre aléatoire à un joueur -- :getidplayer => Id du joueur connecté
router.get("/newplayer/:getidplayer", treeService.newPlayerTreesGenerator);

// Permet d'acheter un abre appartenant à un autre joueur non-lock -- :treeid => id de l'abre ciblé :playerid => id du joueur connecté
router.post("/buyotherplayertree", treeService.buyOtherPlayerTree);

// Permet d'acheter un abre libre -- :treeid => id de l'abre ciblé :playerid => id du joueur connecté
router.post("/buyafreetree", treeService.buyAFreeTree);

// Permet de lock un abre en sa possession -- :playerid => id du joueur connecté , :treeid => id de l'abre ciblé
router.post("/locktree", treeService.lockFreeTree);

function testfunction(req, res, next) {
    console.log(req.body);
}

module.exports = router;
