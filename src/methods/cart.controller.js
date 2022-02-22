//购物车接口函数
const {createOrUpdate,findCarts} = require('../service/carts.server')
class cartsController {
    async add(ctx){
        //将商品添加到购物车
        //1.解析goods_id  user_id
        const {goods_id} = ctx.request.body
        const user_id = ctx.state.user._doc._id
        //2.操作数据库
        const res = await createOrUpdate(user_id,goods_id)
        //3.返回结果
        ctx.body = {
            code:200,
            message:'添加购物车成功',
            result:res
        }
    }

    async findAll(ctx){
        //1.解析请求参数pageNum和pageSize
        const {pageNum=1,pageSize=10} = ctx.request.query
        //2.操作数据库
        const res = await findCarts(pageNum,pageSize)
        //3.返回结果
        ctx.body = {
            code:200,
            message:'获取购物车列表成功',
            result:res
        }

    }
  
}
module.exports = new cartsController()