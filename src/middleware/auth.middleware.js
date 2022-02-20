//验证token中间件
const jwt = require('jsonwebtoken')

//验证token
const auth = async (ctx,next)=>{
    const {authorization=''} = ctx.request.header
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
//验证管理员权限
const hadAdminPermission = async (ctx,next)=>{
    const {is_admin} = ctx.state.user._doc
    if(!is_admin){
        console.error('该用户没有管理员权限')
        ctx.body = {
            code:10103,
            message:'该用户没有管理员权限'
        }
        return 
    }
    await next()
}
module.exports = {auth,hadAdminPermission}