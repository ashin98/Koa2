//购物车路由

const Router = require('koa-router')
const router = new Router({prefix:'/carts'})

const {auth} = require('../middleware/auth.middleware')
const {validator} = require('../middleware/cart.middleware')
const {add,findAll,update,remove,selectAll,unSelectAll} = require('../methods/cart.controller')

//添加购物车，验证登录token，校验数据
router.post('/',auth,validator({goods_id:'string'}),add)

//获取购物车列表
router.get('/',auth,findAll)

//更新购物车
router.patch(
    '/:id',
    auth,
    validator({
        number:{type:'number',required:false},
        selected:{type:'bool',required:false}
    }),
    update
       
)

//删除购物车
router.delete('/',auth,validator({ids:'array'}),remove)

//全选
router.post('/selectall',auth,selectAll)

//全不选
router.post('/unselectall',auth,unSelectAll)

module.exports = router