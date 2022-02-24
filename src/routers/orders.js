const Router = require('koa-router')
const router = new Router({prefix:'/orders'})

const {validator} = require('../middleware/orders.middleware')
const {auth} = require('../middleware/auth.middleware')
const {create,findAll,updateStatue} = require('../methods/orders.controller')


//提交订单
router.post(
    '/',
    auth,
    validator({
        address_id:'string',
        goods_info:'string',
        total:'string'
    }),
    create
)

//获取订单列表
router.get('/',auth,findAll)

//修改订单状态statue,（0：未支付；1：已支付；2：已发货；3：已签收；4：取消）
router.patch('/:id',auth,validator({statue:'number'}),updateStatue)
module.exports = router