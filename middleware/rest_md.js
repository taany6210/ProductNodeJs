module.exports = function (req, resp, next) {
    resp.success = (data = null) => {
        resp.send({
            code: 0,
            msg: "success",
            error: "",
            data: data
        });
    };

    resp.fail = (err, msg) => {
        resp.send({
            code: -1,
            msg: msg,
            error: err,
            data: null
        });
    };
    next();
};