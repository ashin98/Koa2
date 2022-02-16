//user路由模块
const Router = require('koa-router')
const router = new Router({prefix:'/users'})  
const {register,update,del,find,findmes} = require('../methods/curd')
const {login} = require('../methods/users.controller')

router.post('/login',login)

//POST  /users/add
router.post('/register',register)

//POST  /users/update
router.post('/update',update)

//POST  /users/delete
router.post('/del',del)

//GET /users/find
router.get('/find',find)

//GET /users/find/id
router.get('/find/:id',findmes)
module.exports = router