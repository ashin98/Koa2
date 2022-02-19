//验证token中间件
const jwt = require('jsonwebtoken')

const auth = async (ctx,next)=>{
    const {authorization} = ctx.request.header
    const token = authorization.replace('Bearer ','') //Bearer后面的空格别忘了
    try {
        //user中包含了payload信息（id,username）
        const user = jwt.verify(token,"ashin")
        ctx.state.user = user
    } catch (err) {
        switch(err.name){
            case 'TokenExpiredError':
                console.error('token已失效',err)
               return ctx.body = 'token已过期'
            case 'JsonWebTokenError':
                console.error('token无效',err)
              return ctx.body = 'token无效'
               
        }
    }
    await next()
   
}
module.exports = {auth}