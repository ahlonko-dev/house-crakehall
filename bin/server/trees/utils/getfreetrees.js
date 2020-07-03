"use strict";

const db = require("../_helpers/db");

const {
  doc
} = require("prettier");

const Trees = db.Trees;

function newUserFunction(getPlayerId, getFreeTrees, pseudoPlayer, colorPlayer) {
  const playerId = getPlayerId;
  const freeTrees = getFreeTrees;
  const freeTreesNumber = freeTrees.length;
  const randomTrees = [];
  const getRandomTrees = [];
  let i;
  let getRandomTreeNumber;
  console.log("==> GETFREETREES <==");

  if (freeTreesNumber > 10) {
    const getRandomInt = max => {
      getRandomTreeNumber = Math.floor(Math.random() * Math.floor(max));

      if (i === 0) {
        randomTrees.push(getRandomTreeNumber);
      } else {
        if (getRandomTreeNumber !== getRandomTreeNumber[0] || getRandomTreeNumber !== getRandomTreeNumber[1] || getRandomTreeNumber !== getRandomTreeNumber[2]) {
          randomTrees.push(getRandomTreeNumber);
        }
      }
    };

    for (i = 0; i < 3; i++) {
      getRandomInt(freeTreesNumber);
    }

    if (i === 3) {
      for (let index = 0; index < 3; index++) {
        getRandomTrees.push(freeTrees[randomTrees[index]]);
      }

      async function addFreeTreesToNewPlayers(treeArray) {
        try {
          const freeTrees = await Trees.findById(treeArray._id, function (err, doc) {
            doc.player_id = playerId;
            doc.free = false;
            doc.player_color = colorPlayer;
            doc.save();
            console.log("modification de l'abre");
          });
        } catch (error) {
          console.log(error);
        }
      }

      getRandomTrees.forEach(element => {
        addFreeTreesToNewPlayers(element);
      });
    }
  } else {
    console.log("Il n'y a plus assez d'abres disponnible pour un nouveau joueur désolé...");
  }
}

module.exports = newUserFunction;
//# sourceMappingURL=getfreetrees.js.map