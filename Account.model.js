const { Schema, model } = require("mongoose");

const AccountSchema = new Schema ({
  name: {
    type: String,
    require: true,

  },
  gender: {
    type: String,
    require: true,
    enum: ["male", "female"],
  },
  track: {
    type: String,
  }
}, 
  {timestamps: true}
);

const AccountModel = model("Account", AccountSchema);

module.exports = AccountModel;