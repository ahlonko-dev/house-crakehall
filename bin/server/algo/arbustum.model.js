const mongoose = require("mongoose");

const Schema = mongoose.Schema; //const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  nom_complet: {
    type: String
  },
  arbotag: {
    type: Number
  },
  geoloc: {
    lat: {
      type: Number
    },
    lon: {
      type: Number
    }
  },
  hauteur_totale: {
    type: Number
  },
  diametre_cime: {
    type: Number
  },
  circonf: {
    type: Number
  },
  //player_id: [{type: ObjectId}],
  player_id: {
    type: Schema.Types.ObjectId
  },
  player_color: {
    type: Number
  },
  leave: {
    type: Number
  },
  random_name: {
    type: String
  },
  locked: {
    type: Boolean
  },
  free: {
    type: Boolean
  },
  wikilink: {
    type: String
  },
  comment: {
    type: String
  }
});
/* const schema = new Schema({
    y_lambert72: {type: Number},
    arbotag: {type: Number},
    date_donnees: {type: Date},
    x_lambda: {type: Number},
    geoloc: {
        lat: {type: Number},
        lon: {type: Number},
    },
    hauteur_totale: {type: Number},
    x_lambert72: {type: Number},
    y_phi: {type: Number},
    nom_complet: {type: String},
    diametre_cime: {type: Number},
    circonf: {type: Number},
}); */

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,

  transform(doc, ret) {
    delete ret._id;
    delete ret.hash;
  }

});
module.exports = mongoose.model("Arbustum", schema, "arbustum");
//# sourceMappingURL=arbustum.model.js.map