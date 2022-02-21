//商品路由模块

const Router = require('koa-router')
const router = new Router({prefix:'/goods'})
const {upload,create,update,remove,restore,findAll} = require('../methods/goods.controller')
const {auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/goods.middleware')

//上传图片接口
router.post('/upload',auth,hadAdminPermission,upload)

//发布商品接口  有没有token 有没有管理权限 格式校验 写入数据库中发布成功
router.post('/',auth,hadAdminPermission,validator,create)

//修改商品数据
router.put('/:id',auth,hadAdminPermission,validator,update)

//删除(下架)商品
router.post('/:id/off',auth,hadAdminPermission,remove)

//上架商品
router.post('/:id/on',auth,hadAdminPermission,restore)

//获取所有商品
router.get('/',findAll)

module.exports = router