/* eslint-disable no-confusing-arrow */

/* eslint-disable no-use-before-define */
const express = require("express");

const router = express.Router();

const algoService = require("./algo.service"); // routes


router.get("/score/:id", getMoneyById); //annexe return money way from algoService

function getMoneyById(req, res, next) {
  algoService.getMoneyById(req.params.id).then(cashes => cashes ? res.json(cashes) : res.sendStatus(404)).catch(err => next(err));
}

module.exports = router;
//# sourceMappingURL=algo.controller.js.map