var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/passport")

var userSchema = mongoose.Schema({
  username:String,
  pasword:String,
  email:String,
  number:String,
  image:String,
  message:String,
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("user",userSchema)