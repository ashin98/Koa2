//订单数据格式校验
const validator = (rules)=>{
    return async (ctx,next)=>{
        try {
            ctx.verifyParams(rules)
        } catch (err) {
            console.error(err)
           return ctx.body = {
                code:400,
                message:'数据格式错误',
                result:err
            }
        }
        await next()
    }
}

module.exports = {validator}