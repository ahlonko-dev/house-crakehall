"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _double = _interopRequireDefault(require("@mongoosejs/double"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ArbustnumSchema = new _mongoose.Schema({
  y_lambert72: _double.default,
  arbotag: Number,
  date_donnees: Date,
  x_lambda: _double.default,
  geoloc: {
    lat: _double.default,
    lon: _double.default
  },
  hauteur_totale: _double.default,
  x_lambert72: _double.default,
  y_phi: _double.default,
  nom_complet: String,
  diametre_cime: Number,
  circonf: Number
});

var _default = (0, _mongoose.model)("arbresliege", ArbustnumSchema);

exports.default = _default;
//# sourceMappingURL=Arbustum.js.map