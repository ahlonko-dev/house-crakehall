const db = require("../_helpers/db");
const {doc} = require("prettier");
const Trees = db.Trees;
import {insideCircle} from "geolocation-utils";

async function otherPlayerPrice(treeInfo, playerInfo) {
    // ----- geoloc -----

    const allTrees = await Trees.find();
    const treeGeoloc = treeInfo.geoloc;
    const treesInRadius = [];
    const center = {lat: treeGeoloc.lat, lon: treeGeoloc.lon};
    const radius = 100;
    const otherPlayerTree = [];
    const myTreeInCercle = [];

    let otherPlayerTreeValiue = 0;

    // ----- donnée de calcule de l'algo -----

    // valeur de l'arbre ciblé
    const treeLeave = treeInfo.leave;

    // nombre d'arbres dans un rayon de 100 m : treesInRadius.length

    // quantité d'arbre du joueur ciblé dans un rayon de 100m : otherPlayerTree.length

    // valeur de tous les autres arbres du joueur dans un rayon de 100m
    let otherPlayerTreeValiueUtile = otherPlayerTreeValiue - treeInfo.leave;
    // valeur de tout votre arbre dans un rayon de 100m
    let myTreeInCercleValiue = 0;

    allTrees.forEach((element) => {
        const inCercleRadius = insideCircle(
            {lat: element.geoloc.lat, lon: element.geoloc.lon},
            center,
            radius,
        );

        if (inCercleRadius === true) {
            treesInRadius.push(element);
            if (element.player_id == treeInfo.player_id) {
                otherPlayerTree.push(element);
                otherPlayerTreeValiue += element.leave;
            } else if (element.player_id == playerInfo._id) {
                myTreeInCercle.push(element);
            }
        }
    });

    myTreeInCercle.forEach((element) => {
        myTreeInCercleValiue += element.leave;
    });

    if (otherPlayerTreeValiueUtile < 0) {
        otherPlayerTreeValiueUtile = 0;
    }

    const treePrice =
        treeLeave +
        (otherPlayerTreeValiueUtile * treesInRadius.length) /
            otherPlayerTree.length +
        otherPlayerTreeValiueUtile -
        myTreeInCercleValiue;

    return treePrice;
}

module.exports = otherPlayerPrice;

// https://crack-hall-trees.herokuapp.com/trees/buyotherplayertree/5ece7015b467be4c63b04e4a/99

// Si l'arbre appartient à un autre joueur, le prix est calculé avec la formule suivante: [valeur de l'arbre ciblé] + ([valeur de tous les arbres du joueur ciblé dans un rayon de 100 m] × ([nombre d'arbres dans un rayon de 100 m] / [ quantité d'arbre du joueur ciblé dans un rayon de 100m])) + [valeur de tous les autres arbres du joueur dans un rayon de 100m] - [valeur de tout votre arbre dans un rayon de 100m].

// If the tree belongs to another player, the price is computed with the following formula: [value of the targetted tree] + ([value of all the targetted player's trees in 100m radius] × ([amount of trees in 100m radius] / [amount of tree of targetted player in 100m radius])) + [value of all the other players trees in 100m radius] - [value of all your tree in 100m radius].
