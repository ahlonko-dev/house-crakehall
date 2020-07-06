const mongoose = require("mongoose");

const Schema = mongoose.Schema; //const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  pseudo: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  money: {
    type: Number
  },
  status: {
    type: Boolean
  },
  history: {
    type: Date
  },
  gradeUpdate: {
    type: Date
  },
  dateConnect: {
    type: Date
  },
  createdDate: {
    type: Date,
    default: Date.now
  }
}); // c'est quoi ce bout de code

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,

  transform(ret) {
    delete ret._id;
    delete ret.hash;
  }

});
module.exports = mongoose.model("User", schema, "users");
//# sourceMappingURL=user.model.js.map