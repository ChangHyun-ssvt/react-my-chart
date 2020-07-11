var mongoose = require("mongoose");

let db = mongoose.connection;

db.on("error", function () {
  console.log("Connection Failed!");
});

db.once("open", function () {
  console.log("Connected to mongod server");
});

mongoose.connect(
  "mongodb://root:kmov1234@mongodb:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
  { useUnifiedTopology: true, useNewUrlParser: true }
);

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userid: String,
  password: String,
  username: String,
  email: String,
  salt: String,
});

module.exports = mongoose.model("User", userSchema);
