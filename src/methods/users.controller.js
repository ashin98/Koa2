//处理每个users路由中用到的函数，封装成一个类

const {User} = require('../models/user')
const { getUserInfo } = require('../service/user.service')
const {createUser} = require('../service/user.service')
class UserApi {
    async login(ctx,next){
        const {username,password} = ctx.request.body
        //判断合法性
        if(!username||!password){
            console.error('用户名或密码为空',ctx.request.body)
            ctx.statue = 400
            ctx.body = {
                code:10001,
                message:'用户名或密码为空',
                result:''
            }
            return
        }

        //判断合理性
        if(await getUserInfo(username)){
            ctx.body = {
                code:409,
                message:'用户名已存在'
            }
            return
        }
      const res = await createUser(username,password)
        ctx.body = {
            code:200,
            message:'注册成功',
            result:{
                id:res.id,
                username:res.username
            }
        }

    }
}
module.exports = new UserApi()