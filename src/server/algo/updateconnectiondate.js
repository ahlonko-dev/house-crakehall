const {doc} = require("prettier");
import date from "date-and-time";

async function updateConnectionAlgo(user, treesUser) {
    const userDate = user.dateConnect;

    const now = new Date();
    const timeVerifcation = date.subtract(now, userDate).toHours();
    const userMinutes = date.subtract(now, userDate).toMinutes();
    let totalLeavesUser = 0;
    if (timeVerifcation >= 1) {
        console.log(
            "Il s'est écoullé assez de temps pour lancer l'update de timer",
        );

        const totalLeaveDivision = 2 * timeVerifcation;
        const leaveToGiveAll15Min = userMinutes / 15;

        treesUser.forEach((element) => {
            totalLeavesUser += element.leave;
        });
        const totalUserLeaveToGive = totalLeavesUser * leaveToGiveAll15Min;

        return {
            totalUserLeaveToGive,
            totalLeaveDivision,
        };
    } else {
        return false;
    }
}

module.exports = updateConnectionAlgo;
