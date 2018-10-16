let config = null;

if (process.env.NODE_DEV === "product") {
    config = require("./prod");
} else {
    config = require("./dev");
}

module.exports=config;