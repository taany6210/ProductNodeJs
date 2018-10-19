const router = require("express").Router();

const userService = require("../service/user");

router.post("/register", async (req, resp) => {
    console.log("register");

    let user = await userService.addUser(req.body);

    if (!user) {
        throw Error("用户名已存在");
    }

    resp.success(user);
});

module.exports = router;