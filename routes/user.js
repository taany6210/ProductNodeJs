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

/**
 * 根据用户名查询用户
 * url : GET , http://localhost:8080/username
 * @param username : 用户名, zhangsan
 */
router.get("/:username", async (request, response) => {
    // 获取参数
    let username = request.params.username;
    // 执行查询
    let result = await userService.findUserByUsername(username);
    // 查询成功,返回数据
    if (result) {
        response.success(result);
    } else {
        // 查询失败,通知用户原因
        response.fail(`用户名为${username}的用户不存在`);
    }

});

/**
 * 用户登录,返回的数据是token
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}

 */
router.post("/login", async (request, response) => {

    let token = await userService.login(request.body);

    response.success(token);

});

module.exports = router;