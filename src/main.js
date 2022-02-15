//入口文件
const Koa = require('koa')

const app = new Koa()

app.use((ctx,next)=>{
    ctx.body = 'hello nodejs'
})

app.listen(3000,()=>{
    console.log('server is running on http://localhost:3000')
})