let categoryService = require("../service/category");
let router = require("express").Router();

/**
 * 添加分类
 * url :  POST,http://localhost:8080/category
 * 请求体中传递,要添加的数据, {name:手机}
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {

    let result = await categoryService.addItem(request.body);
    response.success(result);

});

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/category/001
 * @returns {Promise<void>}
 */
router.delete("/:id", async (request, response) => {

    let id = request.params.id;
    await categoryService.deleteById(id);
    response.success();

});

/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/category/:id
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
router.put("/:id", async (request, response) => {
    let id = request.params.id;
    let body = request.body;

    await categoryService.updateByID(id, body);
    response.success();
});

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/category?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
router.get("/", async (request, response) => {
    // 获取请求路径中的查询参数
    let page = request.query.page;
    let result = await categoryService.findByPage(page);
    response.success(result);
});

module.exports = router;