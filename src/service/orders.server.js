//订单数据库操作
const {Orders} = require('../models/order')
class OrderService {
    async createOrder(params){
       const res = await Orders.create(params)
       return res
    }

    //获取订单列表，分页查找数据库
    async findAllOrders(pageNum,pageSize,status){
        const total = await Orders.find().count()
        const attribute = {goods_info:1,total:1,order_id:1,statue:1}  //要返回的数据，1表示要返回，0表示不返回
        const offset = (pageNum-1)*parseInt(pageSize)  //要跳过的条数，比如查找10-20条的数据库
        const res = await Orders.find({},attribute).skip(offset).limit(parseInt(pageSize))
        return {
            pageNum,
            pageSize,
            total,
            list:res
        }
    }

        //修改订单状态
    async updateOrderStatue(id,statue){
        const res = await Orders.updateOne({_id:id},{statue})
        return res.acknowledged
    }
}

module.exports = new OrderService()