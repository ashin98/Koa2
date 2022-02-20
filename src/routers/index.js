//汇总所有路由模块导出去
const fs = require('fs')
const Router = require('koa-router')
const router = new Router()

//读取当前文件夹下所有文件目录
fs.readdirSync(__dirname).forEach(file=>{
    //console.log(file) //goods.js  index.js  user.js
    if(file!=='index.js'){  //排除掉自身文件
        let r = require('./' + file)  //拼接路径
        router.use(r.routes())
    }
})
module.exports = router