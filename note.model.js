const { Schema, model } = require("mongoose");

const NoteSchema = new Schema({
  title: {
    type: String,
    require: true,
    trim: true,
    index: true,
  },
  text: {
    type: String,
    require: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
  }
}, {timestamps: true});
const NoteModel = model("Note", NoteSchema);
module.exports = NoteModel;