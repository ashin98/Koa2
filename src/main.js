//入口文件
const Koa = require('koa')

const {APP_PORT} = require('./config/config.default')

const app = new Koa()

app.use((ctx,next)=>{
    ctx.body = 'hello nodejs'
})

app.listen(APP_PORT,()=>{
    console.log(`server is running on http://localhost:${APP_PORT}`)
})