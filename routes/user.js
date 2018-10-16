const router = require("express").Router();

router.get("/register", (req, resp) => {
    console.log("register");

    resp.success(null);
});

module.exports = router;