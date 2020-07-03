/* eslint-disable no-console */
const db = require("../_helpers/db");
const Trees = db.Trees;
const User = db.User;
const newUserFunction = require("../algo/getfreetrees");
const otherPlayerPrice = require("../algo/otherplayerprice");
const userService = require("../users/user.service");
const lockFreeTreeAlgo = require("../algo/lockfreetree");

//const {createIndexes} = require("./trees.model");

// Récupération de l'ensemble des arbres
async function getAllTrees(req, res) {
    try {
        const trees = await Trees.find();
        // console.log(trees);
        res.json(trees);
    } catch (error) {
        res.send(error.response.data.message);
    }
}
/* async function getCurrent(req, res) {
    const momo = await current.getCurrent();
    res.json(momo);
} */

// Recupération de l'id d'un joueur et envois des arbres correspondant
async function getIdPlayer(req, res) {
    try {
        const idPlayer = await req.params;

        const playerTrees = await Trees.find({player_id: idPlayer.getidplayer});
        res.json(playerTrees);
    } catch (error) {
        res.send(error);
    }
}

// Donne les  abres aléatoire à un joueur
async function newPlayerTreesGenerator(req, res) {
    console.log("============newPlayerTreesGenerator=======");
    const idPlayer = req._id;
    const pseudoPlayer = req.pseudo;
    const colorPlayer = req.color;
    console.log(idPlayer, pseudoPlayer, colorPlayer);

    try {
        const freeTrees = await Trees.find({free: true});

        newUserFunction(idPlayer, freeTrees, pseudoPlayer, colorPlayer);
    } catch (error) {
        res.send(error);
    }
}

// Permet d'acheetr un abre non lock appartenant à un autre joueur
async function buyOtherPlayerTree(req, res) {
    try {
        console.log("buyOtherPlayerTree");
        console.log(req.body);

        const treeId = req.body[1];
        const playerId = req.body[0];

        const treeInfo = await Trees.findById(treeId);
        const playerInfo = await User.findById(playerId);
        // console.log(treeInfo);
        // console.log(playerInfo);
        if (
            treeInfo.free == false &&
            treeInfo.locked == false &&
            playerInfo.money >= treeInfo.leave &&
            playerInfo._id != treeInfo.player_id
        ) {
            console.log("tu peux l'acheter");
            const buyATreeNotFree = await otherPlayerPrice(
                treeInfo,
                playerInfo,
            );

            if (playerInfo.money >= buyATreeNotFree) {
                //console.log(buyATreeNotFree);

                const updateTree = await Trees.findById(treeId, function (
                    err,
                    doc,
                ) {
                    doc.free = false;
                    doc.player_id = playerId;
                    doc.player_color = playerInfo.color;
                    doc.save();
                    console.log("L'abre a changé d'appartencance");
                    console.log(treeInfo);
                });

                const updateUser = await User.findById(playerId, function (
                    err,
                    doc,
                ) {
                    doc.money = playerInfo.money - buyATreeNotFree;

                    doc.save();
                    console.log("le prix de l'abre a été déduit");
                    console.log(playerInfo);
                });
            }
        } else {
            console.warn("tu ne peux pas l'acheter");
        }

        //otherPlayerPrice();
    } catch (error) {
        res.send(error);
    }
}

// Fonction pour lock un arbre
async function lockFreeTree(req, res) {
    try {
        console.log("lock tree");
        console.log(req.body);

        const treeId = req.body[1];
        const playerId = req.body[0];

        const playerInfo = await User.find({_id: playerId});
        const treeInfo = await Trees.find({_id: treeId});

        const priceForLock = await lockFreeTreeAlgo(playerInfo[0], treeInfo[0]);
        console.log(playerInfo[0].money);
        if (playerInfo[0].money >= priceForLock) {
            const lockTheTree = await Trees.findById(treeId, function (
                err,
                doc,
            ) {
                doc.locked = true;
                doc.save();
                console.log("L'abre est lock");
                console.log(treeInfo);
            });

            // diminution de la somme du joueur

            const payThePrice = await User.findById(playerId, function (
                err,
                doc,
            ) {
                doc.money = doc.money - priceForLock;
                doc.save();
                console.log("L'abre est lock");
                console.log(treeInfo);
            });
        } else {
            console.log("Tu n'as pas assez d'argent");
        }
    } catch (error) {
        res.send(error);
    }
}

// Permet d'acheter un abre libre
async function buyAFreeTree(req, res) {
    try {
        console.log("buyAfreeTree");
        console.log(req.body);

        const treeId = req.body[1];
        const playerId = req.body[0];
        const findTree = await Trees.find({_id: treeId});
        const treeLeave = await findTree[0].leave;

        const user = await User.findById(playerId);
        if (
            user.money != null &&
            user.money != undefined &&
            user.money >= treeLeave &&
            findTree[0].free == true &&
            findTree[0].locked == false &&
            playerId != findTree[0].player_id
        ) {
            const buyingTree = await Trees.findById(treeId, function (
                err,
                doc,
            ) {
                doc.player_id = playerId;
                doc.free = false;
                doc.player_color = user.color;
                doc.save();
                console.log("modification de l'abre");
            });
            const payThePrice = await User.findById(playerId, function (
                err,
                doc,
            ) {
                doc.money = doc.money - treeLeave;
                doc.save();
                console.log("L'abre est payé");
            });
        } else {
            console.log(
                "Tu n'as pas assez d'argent, vas donc tondre des pelouses !!!!",
            );
        }
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    getAllTrees,
    getIdPlayer,
    newPlayerTreesGenerator,
    buyOtherPlayerTree,
    buyAFreeTree,
    lockFreeTree,
};
