const mongoose = require("mongoose");
const initData = require("./data");
const initData_2 = require("./Userdata"); // Correct import
const Login = require("../models/login");
const User = require("../models/User");

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/melodix");
}
let initDB = async () => {
  await Login.deleteMany({});
  await Login.insertMany(initData.data);
  console.log("data was initialized");
};

let initDB_user = async () => {
  await User.deleteMany({}); // Clear the collection
  await User.insertMany(initData_2.data); // Use the correct variable here
  console.log("data was initialized");
};

initDB_user();
