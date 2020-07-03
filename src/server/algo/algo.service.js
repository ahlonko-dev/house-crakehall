/* eslint-disable no-var */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable require-await */
/* eslint-disable no-return-await */
/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable array-callback-return */
/* eslint-disable prefer-const */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
const db = require("../_helpers/db");

const User = db.User;
const Trees = db.Trees;
const updateConnectionAlgo = require("./updateconnectiondate");
const newPlayerMoneyGenerator = require("./newplayermoneygenerator");
import date from "date-and-time";

// https://www.npmjs.com/package/date-and-time

// Calcule de l'argent à recevoir tous les X temps
async function updateConnectionDate(id) {
    try {
        console.log("updateConnectionDate");
        const user = await User.findById(id);
        const treesUser = await Trees.find({player_id: id});
        const leaveToGive = await updateConnectionAlgo(user, treesUser);
        if (leaveToGive != false) {
            const userMoney = Math.floor(
                (user.money + leaveToGive.totalUserLeaveToGive) /
                    leaveToGive.totalLeaveDivision,
            );
            const updateDateTime = new Date();
            const updateUser = await User.findById(id, function (err, doc) {
                doc.money = userMoney;
                doc.dateConnect = updateDateTime;
                doc.save();
                console.log("le prix de l'abre a été déduit");
            });
        } else {
            console.log("Il ne s'est pas assez écoulé de temps");
        }
    } catch (error) {
        console.log(error);
    }
}

async function newPlayerMoney(req, res) {
    try {
        console.log("==> newPlayerMoney <==");
        console.log(req._id);
        const playerId = req._id;
        const playerInfo = await User.findById(playerId);
        const allUsers = await User.find();
        const money = await newPlayerMoneyGenerator(allUsers);
        const updateUser = await User.findById(playerId, function (err, doc) {
            doc.money = money;
            doc.dateConnect = new Date();
            doc.status = true;
            doc.save();
            console.log("Le joueur a recus ses 1er crédits");
        });
    } catch (error) {
        res.send(error.response.data.message);
    }
}

module.exports = {
    updateConnectionDate,
    newPlayerMoney,
};
