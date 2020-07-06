/* eslint-disable unicorn/filename-case */
import {Schema, model} from "mongoose";
import Double from "@mongoosejs/double";

const ArbustnumSchema = new Schema({
    y_lambert72: Double,
    arbotag: Number,
    date_donnees: Date,
    x_lambda: Double,
    geoloc: {
        lat: Double,
        lon: Double,
    },
    hauteur_totale: Double,
    x_lambert72: Double,
    y_phi: Double,
    nom_complet: String,
    diametre_cime: Number,
    circonf: Number,
});

export default model("arbresliege", ArbustnumSchema);
