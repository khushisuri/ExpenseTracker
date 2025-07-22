const mongoose = require("mongoose");

const DbConnect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {});
    console.log("connected to db");
  } catch (error) {
    console.error(error);
    process.exit(1)
  }
};

module.exports = DbConnect;