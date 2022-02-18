//中间件处理函数
//密码加密-----使用bcryptjs

const bcrypt = require('bcryptjs')
const {getUserInfo} = require('../service/user.service')


//判断注册合法性，用户名或密码是否为空
const userValidator = async (ctx,next)=>{
    const {username,password} = ctx.request.body
    //合法性
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
    await next()
}

//判断合理性,如果数据库里有用户名则无法注册
const verifyUser = async (ctx,next)=>{
    const {username} = ctx.request.body
    try {
        const res = await getUserInfo(username)
        if(res){
            console.error('用户名已经存在',{username})
            ctx.body = {
                code:409,
                message:'用户名已存在'
            }
            return
        }
    } catch (err) {
        console.error('获取用户信息错误')
        ctx.body = {
            code:400,
            message:'注册失败'
        }
        return
        
    }
    await next()
}


//给密码加密
const cryptPassword = async (ctx,next)=>{
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    //hash保存的是密文
    const hash = bcrypt.hashSync(password,salt)
    ctx.request.body.password = hash
    await next()
}

//验证登录合理性
const verifylogin = async (ctx,next)=>{

    try {
         //1.判断用户是否存在
    const {username,password} = ctx.request.body
    const res = await getUserInfo(username)
    if(!res){
        console.error('用户不存在')
        ctx.body = {
            code:'10004',
            message:'用户不存在',
            result:{}
        }
        return
    }
    //2.判断密码是否正确
    if(!bcrypt.compareSync(password,res.password)){
        ctx.body = {
            code:'10005',
            message:'密码错误',
            result:{}
        }
        return
    }
    } catch (err) {
        console.error(err)
        ctx.body = {
            code:'10006',
            message:'登录失败'
        }
    }
    await next()
   
}

module.exports = {cryptPassword,userValidator,verifyUser,verifylogin}
