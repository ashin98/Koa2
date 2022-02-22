//添加购物车校验数据

const validator = async (ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_id:'string'
        }) 
    } catch (err) {
        console.error(err) 
        return ctx.body = {
            code:400,
            message:'商品id错误',
            result:err
        }
    }
    await next()
    
}
module.exports = {validator}