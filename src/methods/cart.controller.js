//购物车接口函数
const {createOrUpdate,findCarts,updateCarts,removeCarts,selectAllCarts,unSelectAllCarts} = require('../service/carts.server')
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

    async update(ctx){
        //1.解析参数
        const id = ctx.request.params
        const {number,selected} = ctx.request.body
        if(number===undefined&&selected===undefined){
            return ctx.body = {
                code:400,
                message:'number和selected不能同时为空'
            }
        }
        //2.操作数据库
        const res = await updateCarts({id,number,selected})
        //3.返回数据
        ctx.body = {
            code:200,
            message:'更新成功',
            result:res
        }
            
        

    }

    async remove(ctx){
        const {ids} = ctx.request.body 
        const res = await removeCarts(ids)
        ctx.body = {
            code:200,
            message:`删除${res}个商品`,
            result:''
        }
    }
  
    async selectAll(ctx){
        const user_id = ctx.state.user._doc._id  //获取登录后的用户id 
        const res = await selectAllCarts(user_id)
        ctx.body = {
            code:200,
            message:'全部选中',
            result:res
        }
    }

    async unSelectAll(ctx){
        const user_id = ctx.state.user._doc._id
        const res = await unSelectAllCarts(user_id)
        ctx.body = {
            code:200,
            message:'全部取消选中',
            result:res
        }
    }
}
module.exports = new cartsController()