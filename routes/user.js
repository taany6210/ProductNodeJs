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


/**
 * 根据用户名删除用户
 * url : DELETE, http://localhost:8080/username
 * @param username 用户名
 */
router.delete("/:username", async (req, resp) => {

    await userService.deleteUserByUsername(req.params.username);

    resp.success();
});

module.exports = router;