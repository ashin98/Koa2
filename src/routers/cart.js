//购物车路由

const Router = require('koa-router')
const router = new Router({prefix:'/carts'})

const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')
const {add,findAll} = require('../methods/cart.controller')

//添加购物车，验证登录token，校验数据
router.post('/',auth,validator,add)
//获取购物车列表
router.get('/',auth,findAll)

module.exports = router