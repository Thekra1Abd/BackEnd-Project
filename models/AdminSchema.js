const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the object sent to data)
const adminSchema = new Schema({
  UserName: String,
  Email:String,
  Password:String,
  },{ timestamps: false });

// Create a model based on that schema
const Admin= mongoose.model("admin", adminSchema);

// export the model
module.exports = Admin

