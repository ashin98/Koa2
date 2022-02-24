//验证收货地地址数据格式

const validator = (auth)=>{
    return async (ctx,next)=>{
        try {
            ctx.verifyParams(auth)
        } catch (err) {
            console.error(err) 
           return ctx.body = {
                code:400,
                message:'地址格式错误',
                res:err
            }
        }
        await next()
    }
}

module.exports = {validator}