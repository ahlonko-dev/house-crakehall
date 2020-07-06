/* eslint-disable no-confusing-arrow */

/* eslint-disable no-use-before-define */
const express = require("express");

const router = express.Router();

const gamerService = require("./gamer.service"); // routes
//router.post("/authenticate", authenticate);


router.post("/add", add);
router.get("/", getAll);
router.get("/current", getCurrent);
router.get("/:id", getById);
router.put("/:id", update);
router.delete("/:id", _delete);
module.exports = router;
/* function authenticate(req, res, next) {
    gamerService
        .authenticate(req.body)
        .then(gamer =>
            gamer
                ? res.json(gamer)
                : res
                      .status(400)
                      .json({message: "pseudo or password is incorrect"}),
        )
        .catch(err => next(err));
} */

function add(req, res, next) {
  gamerService.create(req.body).then(() => res.json({})).catch(err => next(err));
}

function getAll(req, res, next) {
  gamerService.getAll().then(gamer => res.json(gamer)).catch(err => next(err));
}

function getCurrent(req, res, next) {
  gamerService.getById(req.gamer.sub).then(gamer => gamer ? res.json(gamer) : res.sendStatus(404)).catch(err => next(err));
}

function getById(req, res, next) {
  gamerService.getById(req.params.id).then(gamer => gamer ? res.json(gamer) : res.sendStatus(404)).catch(err => next(err));
}

function update(req, res, next) {
  gamerService.update(req.params.id, req.body).then(() => res.json({})).catch(err => next(err));
}

function _delete(req, res, next) {
  gamerService.delete(req.params.id).then(() => res.json({})).catch(err => next(err));
}
//# sourceMappingURL=gamer.controller.js.map