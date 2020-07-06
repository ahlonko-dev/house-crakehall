const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
    pseudo: {type: String, unique: true, required: true},
    lock: {type: Boolean},
    score: {type: Number},
    threename: {type: String},
    color: {type: String},
    wikilink: {type: String},
    comment: {type: String},
    createdDate: {type: Date, default: Date.now},
});

schema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
        delete ret._id;
        delete ret.hash;
    },
});

module.exports = mongoose.model("Gamer", schema);
