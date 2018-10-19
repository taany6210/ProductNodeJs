let productService = require("../service/product");
let router = require("express").Router();

/**
 * 添加分类
 * url :  POST,http://localhost:8080/product
 * 请求体中传递,要添加的数据, {name:手机}
 * @returns {Promise<void>}
 */
router.post("/", async (request, response) => {

    let result = await productService.addItem(request.body);

    response.success(result);

});

/**
 * 根据ID删除
 * url : DELETE ,http://localhost:8080/product/id
 * @returns {Promise<void>}
 */
router.delete("/:id", async (request, response) => {

    let id = request.params.id;

    await productService.deleteById(id);

    response.success();

});

/**
 * 根据ID更新
 * url : PUT , http://localhost:8080/product/:id
 * 更新的数据: {name:手机}
 * @returns {Promise<void>}
 */
router.put("/:id", async (request, response) => {

    let id = request.params.id;
    let body = request.body;
    await productService.updateByID(id, body);

    response.success();
});

/**
 * 分页查询, 页码从1开始,
 *  偏移量 : (page-1)*pageSize
 *  当前页面显示多少条数据 : 10
 * url : GET ,http://localhost:8080/product?page=2
 * 需要指定默认查询的是第一页
 * @returns {Promise<void>}
 */
router.get("/", async (request, response) => {

    let page = request.query.page;

    let result = await productService.findByPage(page);
    response.success(result);

});

module.exports = router;