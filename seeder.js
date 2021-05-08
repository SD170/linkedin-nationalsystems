//node seeder -i [imports users]
//delete trom Compass
const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

//Loading env vars
dotenv.config({ path: "./config/config.env" });

//Load models
const User = require("./models/User");

//Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//Read json files
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/users.json`, "utf-8")
);

//Import into DB
const importData = async () => {
  try {
    await User.create(user);
    console.log("User data created".green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
    console.log('2MB File Limit Exeeded'.red.inverse);

  }
};


if (process.argv[2] === "-i") {
  importData();
}
