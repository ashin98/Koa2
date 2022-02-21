//验证商品参数校验合理性
//统一验证参数合理性插件 在后面的路由里或中间件里都可以使用ctx.verifyParams验证参数 npm i koa-parameter,在app中全局配置使用
const validator = async (ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_name:{type:'string',required:true},
            goods_price:{type:'number',required:true},
            goods_num:{type:'number',required:true},
            goods_img:{type:'string',required:true}
        })
    } catch (err) {
        console.error(err)
        return ctx.body = {
            code:10021,
            message:'商品参数格式错误',
            result:err
        }
    }
    await next()
}

module.exports = {validator}