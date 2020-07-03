const db = require("../_helpers/db");
const {doc} = require("prettier");
const Trees = db.Trees;
const User = db.User;
import {insideCircle} from "geolocation-utils";
import {array} from "prop-types";

async function lockFreeTreeAlgo(playerInfo, treeInfo) {
    // console.log(playerInfo, treeInfo);
    // valeur de l'arbre
    const treeLeave = treeInfo.leave;
    const treeGeoloc = treeInfo.geoloc;
    const center = {lat: treeGeoloc.lat, lon: treeGeoloc.lon};
    const radius = 100;
    const treesInRadius = [];
    const playerInRadius = [];
    // valeur de tous les arbres dans un rayon de 100 m
    let treesInRadiusLeaves = 0;
    // nombre de joueurs dans un rayon de 100 m] : playerInRadiusUnique.length
    // valeur de tous les arbres des joueurs dans un rayon de 100 m
    let playerTreesValiueInRadius = 0;

    if (playerInfo._id == treeInfo.player_id) {
        console.log("cet abre vous appartient");
        const allTrees = await Trees.find();

        allTrees.forEach((element) => {
            const inCercleRadius = insideCircle(
                {lat: element.geoloc.lat, lon: element.geoloc.lon},
                center,
                radius,
            );

            if (inCercleRadius === true) {
                treesInRadius.push(element);
                treesInRadiusLeaves += element.leave;
                if (element.player_id != null) {
                    playerInRadius.push(element.player_id);
                    playerTreesValiueInRadius += element.leave;
                }
            }
        });
        // valeur de tous les arbres des joueurs dans un rayon de 100 m
        const playerInRadiusUnique = playerInRadius.reduce(function (
            acc,
            valCourante,
        ) {
            if (acc.indexOf(valCourante) === -1) {
                acc.push(valCourante);
            }
            return acc;
        },
        []);

        // Total à payer pour lock l'abre
        const priceForLock =
            treeLeave * 10 +
            treesInRadiusLeaves * playerInRadiusUnique.length -
            playerTreesValiueInRadius / playerInRadiusUnique.length;
        //console.log(priceForLock);
        return priceForLock;
    } else {
        console.log("Cet arbre ne vous appartient pas");
    }
}

// Chaque fois qu'il le souhaite, un joueur peut verrouiller un arbre en payant la formule suivante: [valeur de l'arbre] × 10 + ([valeur de tous les arbres dans un rayon de 100 m] × [nombre de joueurs dans un rayon de 100 m]) - ([valeur de tous les arbres des joueurs dans un rayon de 100 m] / [nombre de joueurs dans un rayon de 100 m]). Un arbre verrouillé ne peut pas être acheté par un autre joueur.

module.exports = lockFreeTreeAlgo;
