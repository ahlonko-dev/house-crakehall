/* eslint-disable array-callback-return */

/* eslint-disable no-console */

/* eslint-disable no-use-before-define */
const db = require("../_helpers/db");

const Arbustum = db.Arbustum;
const User = db.User;
module.exports = {
  getMoneyById,
  updateConnectionDate
}; //update connectDate

async function updateConnectionDate(id) {
  try {
    const user = await User.findById(id);
    console.log(` user : ${user.pseudo}`);
    const now = new Date();
    user.dateConnect = now;
    console.log(`connect `);
    await user.save();
  } catch (error) {
    console.log(error);
  }
} //get money for current user


async function getMoneyById(id) {
  try {
    const user = await User.findById(id);
    const id_player = user._id; //console.log("test1", id_player);

    let cashes = 0;
    cashes = await getMoney(id_player);
    user.money = cashes;
    await user.save();
    return cashes; //facultaif
  } catch (error) {
    return error;
  }
} // calcul money


async function getMoney(id_player) {
  try {
    const arbust = await Arbustum.find({
      player_id: id_player
    });
    const myTable = [];
    arbust.map(tree => {
      myTable.push(tree.leave);
    });

    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    const variable = myTable.reduce(reducer);
    return variable;
  } catch (error) {
    return error;
  }
}
//# sourceMappingURL=algo.service.js.map