let Order = require("../model/order");
let productService = require("./product");
let Big = require("big");
let config = require("../config");

// 生成订单
// {productId:001,count:10}
async function addItem(order) {

    // 根据商品Id,查询商品(库存,价格,商品名)
    let product = await productService.findById(order.productId);
    if (!product) {
        throw Error(`ID为${order.productId}的商品不存在`)
    }
    // 给商品名和价格重新赋值
    order.productName = product.name;
    order.productPrice = product.price;
    // 检查库存是否足够
    if (order.count > product.stock) {
        throw Error(`库存不足,请修改购买数量`);
    }

    // 计算总金额  BigDecimal
    // 商品单价
    let price = product.price;
    order.total = Big(price).times(order.count);

    // 生成订单
    let result = await Order.create(order);

    // 扣减库存, 操作Product表
    await productService.updateByID(order.productId, {stock: product.stock - order.count})

    return result;
}

// 分页查询订单
async function findByPage(page = 1) {

    let offset = config.PAGE_SIZE * (page - 1);

    return await Order.find().skip(offset).limit(config.PAGE_SIZE);

}

module.exports = {
    addItem,
    findByPage
};

// 数据库中的数据是不允许删除