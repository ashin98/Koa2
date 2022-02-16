//处理业务代码，与koa相关的 减轻main.js入口文件，看起来清爽一点
const Koa = require('koa')
const koaBody = require('koa-body') //处理post请求参数的中间件  npm i koa-body

const userRouter = require('../routers/user')  //引入user模块的路由

const app = new Koa()

app.use(koaBody())  //注册中间件，要在所有中间件处理之前注册
//处理路由中间件
app.use(userRouter.routes()) 

module.exports =  app