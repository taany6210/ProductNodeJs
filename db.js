const config = require("./config");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/" + config.DB, {useNewUrlParser: true});

const connection = mongoose.connection;

connection.on("error", err => {
    console.log(err);
});

connection.on("open", () => {
    console.log("connect success!");
});


