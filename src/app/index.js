//处理业务代码，与koa相关的 减轻main.js入口文件，看起来清爽一点

const path = require('path')
const koaStatic = require('koa-static')   //启用静态资源文件夹插件  npm i koa-static
const parameter = require('koa-parameter') //验证参数插件

const Koa = require('koa')
const koaBody = require('koa-body') //处理post请求参数的中间件  npm i koa-body


// const userRouter = require('../routers/user')  //引入user模块的路由
// const goodsRouter = require('../routers/goods')
const router = require('../routers/index')

const app = new Koa()

//注册中间件，要在所有中间件处理之前注册  配置一下就可以实现文件上传
app.use(koaBody({
    multipart:true,  //是否支持 multipart-formdate 的表单
    formidable:{
        uploadDir:path.join(__dirname,'../upload'), //不能直接使用相对路径，因为它相对的是不是当前文件而是process.cwd()
        keepExtensions:true   //保留原来的后缀名
    }

}))  

//使用静态资源文件夹，当请求某个文件的时候会在对应的文件夹中找
app.use(koaStatic(path.join(__dirname,'../upload')))
//统一验证参数合理性插件  在后面的路由里或中间件里都可以使用ctx.verifyParams验证参数
app.use(parameter(app))  

//处理路由中间件
app.use(router.routes())
app.use(router.allowedMethods()) //不支持的请求会报405
// app.use(userRouter.routes()) 
// app.use(goodsRouter.routes())




module.exports =  app