/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-extra-parens */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-sync */
/* eslint-disable no-throw-literal */
/* eslint-disable no-return-await */

//const config = require("config.json");
//const jwt = require("jsonwebtoken");
//const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const Gamer = db.Gamer;
/* const secret =
    "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING";
 */
module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

/* async function authenticate({pseudo, password}) {
    const Gamer = await Gamer.findOne({pseudo});
    if (Gamer && bcrypt.compareSync(password, Gamer.hash)) {
        const token = jwt.sign({sub: Gamer.id}, secret);
        return {
            ...Gamer.toJSON(),
            token,
        };
    }
} */

async function getAll() {
    return await Gamer.find();
}

async function getById(id) {
    return await Gamer.findById(id);
}

async function create(GamerParam) {
    // validate
    /* if (await Gamer.findOne({pseudo: GamerParam.pseudo})) {
        throw `pseudo "${GamerParam.pseudo}" is already taken`;
    } */

    const gamer = new Gamer(GamerParam);

    // hash password don't need to log
    /* if (GamerParam.password) {
        Gamer.hash = bcrypt.hashSync(GamerParam.password, 10);
    } */

    // save Gamer
    await gamer.save();
}

async function update(id, GamerParam) {
    const gamer = await Gamer.findById(id);

    // validate
    if (!Gamer) {
        throw "Gamer not found";
    }
    if (
        Gamer.pseudo !== GamerParam.pseudo &&
        (await Gamer.findOne({pseudo: GamerParam.pseudo}))
    ) {
        throw `pseudo "${GamerParam.pseudo}" is already taken`;
    }

    // hash password if it was entered dont need to log
    /* if (GamerParam.password) {
        GamerParam.hash = bcrypt.hashSync(GamerParam.password, 10);
    } */

    // copy GamerParam properties to Gamer
    Object.assign(gamer, GamerParam);

    await gamer.save();
}

async function _delete(id) {
    await Gamer.findByIdAndRemove(id);
}
