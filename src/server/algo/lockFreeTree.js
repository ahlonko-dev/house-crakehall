const {object} = require("prop-types");

const lockFreeTree = (idPlayer, getTreeToLock, allTrees) => {
    const leavesFreeTree = getTreeToLock.leavesFree;
    const treeInRadius = [];
    const treeToOtherPlayers = [];
    let treePrinceInRadius = 0;
    let treeInRadiusValiue = 0;
    let value;

    const center = {
        lat: getTreeToLock.geoloc.lat,
        lon: getTreeToLock.geoloc.lon,
    };
    const radius = 100; // meters

    allTrees.forEach((element) => {
        const isTreeInRadius = insideCircle(
            {lat: element.geoloc.lat, lon: element.geoloc.lon},
            center,
            radius,
        );

        if (isTreeInRadius === true) {
            treeInRadius.push(element);
            treeInRadiusValiue = treeInRadiusValiue + element.leaves;
        }
    });

    treeInRadius.forEach((element) => {
        treePrinceInRadius = treePrinceInRadius + element.leaves;
        if (element.free === false && element.id !== idPlayer) {
            treeToOtherPlayers.push(element);
        }
    });

    const removeDuplicateId = (treeToOtherPlayers) => {
        let unique = {};
        treeToOtherPlayers.forEach(function (i) {
            if (!unique[i]) {
                unique[i] = true;
            }
        });
        return object.keys(unique);
    };

    const uniqueIdPlayerTree = removeDuplicateId(treeToOtherPlayers);
    console.log(treeInRadiusValiue);

    const treeLockPrice =
        leavesFreeTree * 10 +
        treePrinceInRadius * uniqueIdPlayerTree.length -
        treeInRadiusValiue / uniqueIdPlayerTree.length;

    console.log(treeLockPrice);

    value = treeLockPrice;

    return value;
};
