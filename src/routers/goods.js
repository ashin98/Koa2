//商品路由模块

const Router = require('koa-router')
const router = new Router({prefix:'/goods'})
const {upload} = require('../methods/goods.controller')
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/goods.middleware')

//上传图片接口
router.post('/upload',auth,hadAdminPermission,upload)

//发布商品接口  有没有token 有没有管理权限 格式校验 写入数据库中发布成功
router.post('/',auth,hadAdminPermission,validator,(ctx,next)=>{
    ctx.body={
        code:200,
        message:'商品发布成功'
    }
})

module.exports = router