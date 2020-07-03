"use strict";

const db = require("./_helpers/db");

const Trees = db.Trees;

const newUserFunction = (getPlayerId, getFreeTrees) => {
  const playerId = getPlayerId;
  const freeTrees = getFreeTrees;
  const freeTreesNumber = freeTrees.length;
  const randomTrees = [];
  const getRandomTrees = [];
  let i;
  let getRandomTreeNumber;

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
          const freeTrees = await Trees.findById(treeArray._id, (err, doc) => {
            doc.player_id = getPlayerId;
            doc.save();
            console.log(doc);
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
};

module.exports = newUserFunction;
//# sourceMappingURL=getfreetrees.js.map