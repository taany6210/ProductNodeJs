let encryptUtil = require("../util/encryptUtil");
let config = require("../config");
let userService = require("../service/user");

function checkUrl(url) {
    // 不需要登录
    // 注册 : /user/regist
    // 登录 : /user/login

    let ignoreUrls = [
        /\/user\/regist/,
        /\/user\/login/

    ];

    // /user/login

    // 标志位,当前的url是否需要进行登录状态的校验,默认值是需要
    let isNeedCheck = true;
    // js中的forEach()是不能中断的,break

    for (let i = 0; i < ignoreUrls.length; i++) {
        let ignoreUrl = ignoreUrls[i];
        if (ignoreUrl.test(url)) {
            isNeedCheck = false;
            break;
        }
    }

    return isNeedCheck;
}

// 校验用户是否已经登录
module.exports = async (request, response, next) => {
    // 用户请求的路径
    let url = request.url;

    // 用户请求的url是需要进行登录状态的校验
    if (checkUrl(url)) {

        // 获取token
        let token = request.get("token");
        if (!token) {
            throw  Error("请求头中没有Token数据,请登录");
        }

        // 解密出来的是json字符串,不是js对象,所以不能通过.属性名的方式获取到属性值
        let tokenDecrypted = null;
        try {
            tokenDecrypted = encryptUtil.aesDecrypt(token, config.TokenKey);
        } catch (e) {
            throw  Error("token解密失败,请登录");
        }
        // 把json字符串转成js对象
        let tokenJs = JSON.parse(tokenDecrypted);
        // 获取token的有效期
        let expire = tokenJs.expire;
        if (Date.now() > expire) {
            throw  Error("token已过期,请重新登录");
        }
        // 获取token中的用户名
        let username = tokenJs.username;
        // 根据用户名查询用户
        let user = await userService.findUserByUsername(username);
        // 如果查询不到,说明token是伪造的
        if (!user) {
            throw  Error("token无效,请重新登录");
        }

        // 把查询到的用户存储到request对象身上
        request.user = user;

    }

    // 放行的代码
    next();
}