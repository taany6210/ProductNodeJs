const User = require("../service/user");

function addUser() {
    let user = {
        username: "lisi",
        password: "123456",
        age: 19
    };

    User.addUser(user);
}

addUser();

