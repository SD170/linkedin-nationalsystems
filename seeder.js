//node seeder -i [imports users]
//node seeder -d [deletes users]
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
  }
};

//Delete from DB
const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log("User data delete".red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
