const {createOrder,findAllOrders,updateOrderStatue} = require('../service/orders.server')

class OrderController{
    async create(ctx){
        //1.准备数据
        const user_id = ctx.state.user._doc._id
        const {address_id,goods_info,total} = ctx.request.body 
        const order_id = 'LX' + Date.now()   //生成唯一的订单编号
        //2.操作数据库
        const res = await createOrder({user_id,address_id,goods_info,total,order_id})
        //3.返回结果
        ctx.body = {
            code:200,
            message:'生成订单成功',
            result:res
        }
    }

    async findAll(ctx){
        //1.解析数据，get请求，请求参数都在query中
        const {pageNum=1,pageSize=10,status=0} = ctx.request.query

        //2.操作数据库
        const res = await findAllOrders(pageNum,pageSize,status) 
        //3.返回结果
        ctx.body = {
            code:200,
            message:'获取订单成功',
            result:res
        }
    }

    async updateStatue(ctx){
        const {id} = ctx.request.params
        const {statue} = ctx.request.body
        const res = await updateOrderStatue(id,statue)
        ctx.body = {
            code:200,
            message:'修改订单状态成功',
            result:res
        }
    }
}

module.exports = new OrderController()