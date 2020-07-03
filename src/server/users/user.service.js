/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
/* eslint-disable consistent-return */
/* eslint-disable no-extra-parens */
/* eslint-disable require-atomic-updates */
/* eslint-disable no-sync */
/* eslint-disable no-throw-literal */
/* eslint-disable no-return-await */
//const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../_helpers/db");
const User = db.User;
const secret =
    "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING";

const treeService = require("../trees/trees.service");
const algoService = require("../algo/algo.service");
import date from "date-and-time";

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete,
};

// GreatToto
async function authenticate({pseudo, password}) {
    let status = false; //status connexion
    const user = await User.findOne({pseudo});
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({sub: user.id}, secret);
        console.log(user);
        status = true;
        user.status = status; //change status true

        await algoService.updateConnectionDate(user._id);
        await user.save(); //save change

        return {
            ...user.toJSON(),
            token,
        };
    }
}

async function getAll() {
    return await User.find();
}

async function getById(id) {
    return await User.findById(id);
}
async function create(userParam) {
    // validate
    if (await User.findOne({pseudo: userParam.pseudo})) {
        throw `pseudo "${userParam.pseudo}" is already taken`;
    }
    const user = new User(userParam);
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    user.dateConnect = Date();

    await user.save();
    const findIdPlayer = await findUserId(user.pseudo);
    await treeService.newPlayerTreesGenerator(findIdPlayer);
    await algoService.newPlayerMoney(findIdPlayer);
    // donner l'argent
}

async function findUserId(playerPseudo) {
    const user = await User.findOne({pseudo: playerPseudo}, (err) => {
        if (err) {
            console.log(err);
            return null;
        }
    });
    return user;
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) {
        throw "User not found";
    }
    if (
        user.pseudo !== userParam.pseudo &&
        (await User.findOne({pseudo: userParam.pseudo}))
    ) {
        throw `pseudo "${userParam.pseudo}" is already taken`;
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
