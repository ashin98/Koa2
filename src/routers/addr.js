//地址路由

const Router = require('koa-router')

const router = new Router({prefix:'/address'})

const {auth} = require('../middleware/auth.middleware') 
const {validator} = require('../middleware/addr.middleware')
const {addAddress,findAll,updateAddr,removeAddr,setDefault} = require('../methods/address.controller')

//添加地址
router.post('/',auth,validator({consignee:'string',phone:{type:'string',format:/^1\d{10}$/},address:'string'}),addAddress)

//获取地址
router.get('/',auth,findAll)

//修改地址
router.put(
    '/:id',
    auth,
    validator({
        consignee:{type:'string'},
        phone:{type:'string',format:/^1\d{10}$/},
        address:{type:'string'}
    }),
    updateAddr
    )

//删除地址
router.delete('/:id',auth,removeAddr)

//设置默认地址
router.patch('/:id',auth,setDefault)

module.exports = router