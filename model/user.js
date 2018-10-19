const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "用户名不能缺少!"]
    },
    password: {
        type: String,
        required: [true, "用户名不能为空!"]
    },
    age: {
        type: Number,
        min: [18, "未成年不能注册!"],
        max: [70, "年龄不能超过70岁!"]
    },
    role: {
        type: Number,
        default: 0
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("user",schema);