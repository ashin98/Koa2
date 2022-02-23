//添加购物车校验数据

const validator = (rules)=>{   //使用闭包
    return async (ctx,next)=>{
        try {
            ctx.verifyParams(rules) 
        } catch (err) {
            console.error(err) 
            return ctx.body = {
                code:400,
                message:'购物车数据格式错误',
                result:err
            }
        }
        await next()
}
}
    

module.exports = {validator}