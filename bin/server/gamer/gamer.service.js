"use strict";

const db = require("../_helpers/db");

const Gamer = db.Gamer;
module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: _delete
};

async function getAll() {
  return await Gamer.find();
}

async function getById(id) {
  return await Gamer.findById(id);
}

async function create(GamerParam) {
  const gamer = new Gamer(GamerParam);
  await gamer.save();
}

async function update(id, GamerParam) {
  const gamer = await Gamer.findById(id);

  if (!Gamer) {
    throw "Gamer not found";
  }

  if (Gamer.pseudo !== GamerParam.pseudo && (await Gamer.findOne({
    pseudo: GamerParam.pseudo
  }))) {
    throw `pseudo "${GamerParam.pseudo}" is already taken`;
  }

  Object.assign(gamer, GamerParam);
  await gamer.save();
}

async function _delete(id) {
  await Gamer.findByIdAndRemove(id);
}
//# sourceMappingURL=gamer.service.js.map