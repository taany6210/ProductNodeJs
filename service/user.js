const userDao = require("../model/user");
const config = require("../config");
const crypto = require("lxj-crypto");
const encryptUtil = require("../util/encryptUtil");

/**
 * 增加用户
 * @param user
 * @returns {Promise<*>}
 */
async function addUser(user) {

    const result = await findUserByUsername(user.username);
    if (result) {
        throw Error(`用户名${user.username}已经被占用`);
    }

    //密码加密
    user.password = encryptUtil.md5Hmac(user.password, user.username);
    // 对角色重新赋值,避免攻击
    user.role = 0;
    user.created = Date.now();

    user = await userDao.create(user);
    user.password = "";

    return user;
}

async function deleteUserByUsername(username) {
    await isExistByUsername(username);
    const result = await userDao.deleteOne({username: username});
    if (result.n !== 1) {
        throw Error("删除失败")
    }
}

// 根据用户名检查用户是否存在
async function isExistByUsername(username) {
    let result = await findUserByUsername(username);
    if (!result) {
        throw Error(`用户名为${username}的用户不存在`);
    }
}

/**
 * 根据用户名查找用户
 * @param username
 * @returns {Promise<*>}
 */
async function findUserByUsername(username) {
    return await userDao.findOne({username: username}).select("-password");
}


/**
 * 用户登录
 * url : POST , http://localhost:8080/
 * @param user {username:zhangsan,password:123}
 * @returns {Promise<void>}
 */
async function login(user) {
    // 根据用户名检查用户是否存在
    await isExistByUsername(user.username);
    // 用户有没有传递密码过来
    let password = user.password;
    if (password == null || password.trim().length === 0) {
        throw Error("密码不能为空");
    }

    // 加密密码
    user.password = encryptUtil.md5Hmac(password, user.username);
    // 查询用户
    user = await userDao.findOne(user);
    // 查询用户失败,说明用户名或密码错误
    if (!user) {
        throw Error("用户名或密码错误");
    }
    // 查询成功,定义token数据
    let token = {
        username: user.username,
        expire: Date.now() + config.TokenExpire
    };

    // 参数1 : 原文
    // 参数2 : 密钥
    // 对token进行加密
    return encryptUtil.aesEncrypt(JSON.stringify(token), config.TokenKey);

}

module.exports = {
    addUser,
    deleteUserByUsername,
    findUserByUsername,
    login
};
