const mongoose = require("mongoose");

async function connectMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("Mongoose Connexted!!"))
    .catch((err) => console.log("Error Detected: ", err));
}

module.exports = { connectMongoDB };
