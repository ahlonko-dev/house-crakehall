/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const db = require("../../_helpers/db");
//const {doc} = require("prettier");
//const Trees = db.Trees;
import {insideCircle} from "geolocation-utils";

const otherPlayerPrice = (getTree, allTrees, playerId) => {
    const otherTreesInCercle = [];
    const NotFreeTreesInCercle = [];
    const playerIdTreesInCercle = [];
    let NotFreeTreesInCercleTotalLeave = 0;
    let playerIdTreeInCercleTotalLeave = 0;
    //console.log(getTree);

    const center = {lat: getTree.geoloc.lat, lon: getTree.geoloc.lon};
    const radius = 100; // meters

    allTrees.forEach(element => {
        const inCercleRadius = insideCircle(
            {lat: element.geoloc.lat, lon: element.geoloc.lon},
            center,
            radius,
        );

        if (inCercleRadius === true) {
            if (
                element.player_id === getTree.player_id &&
                element.player_id !== null
            ) {
                NotFreeTreesInCercle.push(element);
            } else if (
                element.player_id === playerId &&
                element.player_id !== null
            ) {
                playerIdTreesInCercle.push(element);
            } else {
                otherTreesInCercle.push(element);
            }
        }
    });

    NotFreeTreesInCercle.forEach(element => {
        NotFreeTreesInCercleTotalLeave += element;
    });
    playerIdTreesInCercle.forEach(element => {
        playerIdTreeInCercleTotalLeave += element;
    });

    const treePrice =
        getTree.leave +
        (NotFreeTreesInCercleTotalLeave *
            (otherTreesInCercle.length + NotFreeTreesInCercle.length)) /
            NotFreeTreesInCercle.length +
        playerIdTreesInCercle.length -
        playerIdTreeInCercleTotalLeave;

    console.log(treePrice);
};

module.exports = otherPlayerPrice;

// http://localhost/trees/buyotherplayertree/5ece7015b467be4c63b04e4a/99

// Si l'arbre appartient à un autre joueur, le prix est calculé avec la formule suivante: [valeur de l'arbre ciblé] + ([valeur de tous les arbres du joueur ciblé dans un rayon de 100 m] × ([nombre d'arbres dans un rayon de 100 m] / [ quantité d'arbre du joueur ciblé dans un rayon de 100m])) + [valeur de tous les autres arbres du joueur dans un rayon de 100m] - [valeur de tout votre arbre dans un rayon de 100m].

// If the tree belongs to another player, the price is computed with the following formula: [value of the targetted tree] + ([value of all the targetted player's trees in 100m radius] × ([amount of trees in 100m radius] / [amount of tree of targetted player in 100m radius])) + [value of all the other players trees in 100m radius] - [value of all your tree in 100m radius].
