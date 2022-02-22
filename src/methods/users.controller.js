//处理每个users路由中用到的函数，封装成一个类
//颁发token----- jsonwebtoken

const jwt = require('jsonwebtoken')
const {User} = require('../models/user')
const {createUser, getUserInfo,updatePasswood} = require('../service/user.service')
class UserApi {
    async register(ctx,next){
        const {username,password} = ctx.request.body
        try {
             //使用数据库创建数据
      const res = await createUser(username,password)
      ctx.body = {
          code:200,
          message:'注册成功',
          result:{
              id:res.id,
              username:res.username
          }
      }
        } catch (err) {
            console.log(err)
            ctx.body = {
                code:400,
                message:'注册失败',
                result:{}
            }
        }
       
            next()
    }

    async login(ctx,next){
        try {
            //从返回结果对象中剔出掉password属性
            const {username} = ctx.request.body
        const {password,...res} = await getUserInfo(username)

        ctx.body = {
            code:200,
            result:`登录成功`,
            result:{
                token:jwt.sign(res,"ashin",{expiresIn:'5h'}) //第一个参数是payload载荷(id,username)，第二个参数是私钥，第三个参数是过期时间
            }
        }
        } catch (err) {
            console.error('用户登录失败',err)
        }
        
    }

    async changePassword(ctx,next){
        //1.获取数据
        const id =ctx.state.user._doc._id
        const {password} = ctx.request.body
        //console.log(id,password)
        //2.操作数据库
       if(await updatePasswood({id,password})) {
           ctx.body = {
               code:200,
               message:'修改密码成功',
               result:''
           }
       }else{
        ctx.body = {
            code:400,
            message:'修改密码失败'
        }
       }
       
    }
}
module.exports = new UserApi()