"use strict";

var _geolocationUtils = require("geolocation-utils");

const db = require("../../_helpers/db");

const otherPlayerPrice = (getTree, allTrees, playerId) => {
  const otherTreesInCercle = [];
  const NotFreeTreesInCercle = [];
  const playerIdTreesInCercle = [];
  let NotFreeTreesInCercleTotalLeave = 0;
  let playerIdTreeInCercleTotalLeave = 0;
  const center = {
    lat: getTree.geoloc.lat,
    lon: getTree.geoloc.lon
  };
  const radius = 100;
  allTrees.forEach(element => {
    const inCercleRadius = (0, _geolocationUtils.insideCircle)({
      lat: element.geoloc.lat,
      lon: element.geoloc.lon
    }, center, radius);

    if (inCercleRadius === true) {
      if (element.player_id === getTree.player_id && element.player_id !== null) {
        NotFreeTreesInCercle.push(element);
      } else if (element.player_id === playerId && element.player_id !== null) {
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
  const treePrice = getTree.leave + NotFreeTreesInCercleTotalLeave * (otherTreesInCercle.length + NotFreeTreesInCercle.length) / NotFreeTreesInCercle.length + playerIdTreesInCercle.length - playerIdTreeInCercleTotalLeave;
  console.log(treePrice);
};

module.exports = otherPlayerPrice;
//# sourceMappingURL=otherplayerprice.js.map