require("./db");

require("express-async-errors");

const config = require("./config");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");

const app = express();


//注册中间件
// log中间件
app.use(morgan('combined'));

// 注册body-parser中间件
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// 注册自定义的中间件
app.use(require('./middleware/rest_md'));
app.use(require("./middleware/token_md"));// 校验用户的登录状态
app.use(require("./middleware/permission_md"));// 校验权限

//注册路由
app.use("/user", require("./routes/user"));
app.use("/category", require("./routes/category"));
app.use("/product", require("./routes/product"));
app.use("/order", require("./routes/order"));

// 异常处理中间件
app.use((err, req, resp, next) => {
    console.log("error 捕获到了");
    resp.fail(err.toString(),"");
});


app.listen(config.PORT);