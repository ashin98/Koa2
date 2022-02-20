//验证商品参数校验合理性
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