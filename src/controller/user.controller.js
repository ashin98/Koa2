//处理每个users路由中用到的函数，封装成一个类

const {createUser} = require('../service/user.service')
class userController {
    async register(ctx,next){
        //1.获取客户端数据
        //console.log(ctx.request.body) 
        const {user_name,password} = ctx.request.body
        //2.操作数据库
        const res = await createUser(user_name,password)
        console.log(res)
        //3.返回结果
        ctx.body = '111'
    }

    async login(ctx,next){
        ctx.body = 'login'
    }
}

module .exports = new userController()